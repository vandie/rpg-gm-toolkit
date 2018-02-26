<template>
  <div class="columns">
      <div class="column">
          <div class="section">
            <div class="card">
                <div class="card-content">
                    <b-field>
                        <b-select placeholder="No race selected" v-model="selRace" expanded>
                            <option v-for="(race, index) in races" v-bind:key="index" v-bind:value="index">{{race.name}}</option>
                            <option v-bind:value="races.length">Random Race</option>
                        </b-select>
                        <b-select placeholder="No sex selected" v-model="sex" expanded>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="random">Randomize Sex</option>
                        </b-select>
                    </b-field>
                    <b-field>
                        <b-select placeholder="No class selected" v-model="selClass">
                            <option v-for="(c, index) in classes" v-bind:key="index" v-bind:value="index">{{c.name}}</option>
                            <option v-bind:value="classes.length">Random Class</option>
                        </b-select>
                        <b-input type="Number" placeholder="Level" max="20" v-model="level" expanded></b-input>
                    </b-field>
                    <a id="regen" class="button is-primary is-outlined" v-on:click="regenerate()">Regenerate</a>
                </div>
            </div>
          </div>
      </div>
      <div class="column">
          <div class="section">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Name : {{name}}</p>
                </header>
                <div class="card-content">
                    <h4> Race : {{currentRace.name}} </h4>
                    <h4> Class : {{currentClass.name}} ( {{curLevel}} )</h4>
                    <h4> Sex : {{capitalizeFirstLetter(fSex)}} </h4>
                    <h4> Height : {{stature.writtenHeight}} </h4>
                    <h4> Weight : {{stature.writtenWeight}} </h4>
                    <br>
                    <h4> Hair : {{hair}} </h4>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import raceData from "../assets/data/raceData.json"
import classData from "../assets/data/classData.json"

export default {
  name:"NPC",
  data: function(){
      return {
          races: raceData.races,
          classes: classData.classes,
          selRace: 0,
          selClass: classData.classes.length,
          sex: "male",
          level: null
      }
  },
  methods: {
    regenerate: function(){
        let s = this.sex
        this.sex = this.sex == "male" ? "female" : "male"
        this.sex = s
        let c = this.selClass
        this.selClass = this.selClass == 0 ? 1 : 0
        this.selClass = c
        let l = this.level
        this.level = this.level == 0 ? 1 : 0
        this.level = l
        let r = this.selRace
        this.selRace = this.selRace == 0 ? 1 : 0
        this.selRace = r
    },
    toNameCase: function(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },
    capitalizeFirstLetter: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  computed:{
    currentRace: function(){
        if (this.selRace != this.races.length){
            return this.races[this.selRace]
        }else{
            return this.races[ Math.floor(Math.random()*this.races.length) ]
        }
    },
    currentClass: function(){
        if (this.selClass != this.classes.length){
            return this.classes[this.selClass]
        }else{
            return this.classes[ Math.floor(Math.random()*this.classes.length) ]
        }
    },
    fSex: function(){
        return this.sex == "random" ? ( Math.random()*100 > 49 ? "male" : "female" ) : this.sex
    },
    stature: function(){
        let sex = this.fSex
        let maxDie = this.currentRace.stature.heightWeightRoll[sex]
        let roll = Math.floor( Math.random() * (maxDie-2) ) + 2
        let heightInches = this.currentRace.stature.baseHeightInches[sex]+roll
        let weight = this.currentRace.stature.baseWeight[sex]+( roll * this.currentRace.stature.weightMultiplyer[sex] )

        let remainder = heightInches % 12
        let feet = (heightInches - remainder)/12

        return {
            heightInches: heightInches,
            writtenHeight: feet+" ft "+remainder+' in',
            weight: weight,
            writtenWeight: weight+" lbs"
        }
    },
    name: function(){
        if (this.currentRace.firstNames){
            let n = this.currentRace.firstNames[this.fSex][Math.floor(Math.random()*this.currentRace.firstNames[this.fSex].length-1)] +" "+ this.currentRace.surnames[Math.floor(Math.random()*this.currentRace.surnames.length-1)]
            return this.toNameCase(n)
        } else return "N/A"
    },
    curLevel: function(){
        if(this.level != null && this.level != "") return this.level
        else return Math.floor(Math.random()*5)+2
    },
    pronoun: function(){
        return this.fSex == "male" ? "his": "her"
    },
    hair: function(){
        let data = this.currentRace.hair
        let color = data.colors[ Math.floor(Math.random()*data.colors.length) ]
        let style = data.styles[ Math.floor(Math.random()*data.styles.length) ]
        let note = data.notes[ Math.floor(Math.random()*data.notes.length) ]
        return this.capitalizeFirstLetter(this.pronoun)+" "+note+" "+color+" hair is "+style+"."
    }
  }
}
</script>

<style lang="scss">
    #regen{
        width:100%;;
    }
</style>


