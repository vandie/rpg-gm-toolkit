<template>
  <div class="columns">
      <div class="column">
          <div class="section options">
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
                    <b-field>
                        <b-select v-if="selClass != classes.length" placeholder="No Alignment selected" v-model="selAlignment" expanded>
                            <option v-for="(alignment, index) in currentClass.alignments" v-bind:key="index" v-bind:value="index">{{alignment}}</option>
                            <option v-bind:value="currentClass.alignments.length">Random alignment</option>
                        </b-select>
                    </b-field>
                    <b-field>
                        <b-input type="text" placeholder="Custom Hair Color" v-model="cHair" expanded></b-input>
                        <b-input type="text" placeholder="Custom Eye Color" v-model="cEye" expanded></b-input>
                    </b-field>
                    <a id="regen" class="button is-primary is-outlined" v-on:click="regenerate()">Roll up another NPC</a>
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
                    <h4> <b> Race </b> : {{currentRace.name}} </h4>
                    <h4> <b> Class </b> : {{currentClass.name}} ( {{curLevel}} )</h4>
                    <h4> <b> Sex </b> : {{sentanceCapitalise(fSex)}} </h4>
                    <h4> <b> Height </b> : {{stature.writtenHeight}} </h4>
                    <h4> <b> Weight </b> : {{stature.writtenWeight}} </h4>
                    <h4> <b> Alignment </b> : {{displayAlignment}} </h4>
                    <br>
                    <h4> <b> Description </b> : {{ completeDescription }} </h4>
                    <!-- Separate descriptions.
                    <br>
                    <h4> Hair : {{hair}} </h4>
                    <h4> Eye Color : {{eye}} </h4>
                    <h4> Clothing: {{wornClothes.description}}</h4>
                    -->
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import raceData from "../assets/data/raceData.json"
import classData from "../assets/data/classData.json"
import eyeNotes from "../assets/data/eyeNotes.json"
import clothes from "../assets/data/clothing.json"

export default {
  name:"NPC",
  data: function(){
      this.load()
      return {
          races: raceData.races,
          classes: classData.classes,
          eyeNotes: eyeNotes,
          clothes: clothes,
          selRace: raceData.races.length,
          selClass: classData.classes.length,
          sex: "random",
          level: null,
          selAlignment: 0,
          cHair: "",
          cEye: ""
      }
  },
  methods: {
    load: function(){
        this.$notify({
            group: 'notif',
            title: 'Use this tool with Google Assistant!',
            text: 'Simply say "Ok Google, Ask Dungeon Master\'s Toolkit to Generate a Halfling Druid"',
            width: '530px',
            duration:9000,
            type: 'success'
        });
    },
    regenerate: function(){
        let a = this.selAlignment
        let s = this.sex
        this.sex = this.sex
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
        this.selAlignment = a
    },
    toNameCase: function(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },
    sentanceCapitalise: function (string) {
        let s = string.split('. ')
        for(let i in s){
            s[i] = s[i].charAt(0).toUpperCase() + s[i].slice(1)
        }
        return s.join(". ")
    },
    pronoun: function(t){
        if (t == "their") return this.fSex == "male" ? "his": "her"
        else if (t == "they") return this.fSex == "male" ? "he": "she"
        else if (t == "them") return this.fSex == "male" ? "him": "her"
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
    currentAlignment: function(){
        let ca = this.currentClass.alignments

        this.selAlignment > ca.length ? this.selAlignment = ca.length : ca = ca

        if(this.selAlignment == ca.length || this.class == this.classes.length){
            return ca[ Math.floor(Math.random()*ca.length) ]
        }else{
            return ca[this.selAlignment]
        }
    },
    displayAlignment: function(){
        switch(this.currentAlignment){
            case("CN"):
                return "Chaotic Neutral"
                break;
            case("CG"):
                return "Chaotic Good"
                break;
            case("CE"):
                return "Chaotic Evil"
                break;
            case("N"):
                return "True Neutral"
                break;
            case("NG"):
                return "Neutral Good"
                break;
            case("NE"):
                return "Neutral Evil"
                break;
            case("LN"):
                return "Lawful Neutral"
                break;
            case("LG"):
                return "Lawful Good"
                break;
            case("LE"):
                return "Lawful Evil"
                break;
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
            let fn = this.currentRace.firstNames[this.fSex][Math.floor(Math.random()*this.currentRace.firstNames[this.fSex].length)]
            let ln = this.currentRace.surnames[Math.floor(Math.random()*this.currentRace.surnames.length)]

            return this.toNameCase(fn+" "+ln)
        } else return "N/A"
    },
    curLevel: function(){
        if(this.level != null && this.level != "") return this.level
        else return Math.floor(Math.random()*5)+2
    },
    hair: function(){
        let data = this.currentRace.hair
        let color = this.cHair == "" ? data.colors[ Math.floor(Math.random()*data.colors.length) ] : this.cHair.toLowerCase()
        let style = data.styles[ Math.floor(Math.random()*data.styles.length) ]
        let note = data.notes[ Math.floor(Math.random()*data.notes.length) ]
        return "their "+note+" "+color+" hair appears "+style+"."
    },
    eye: function(){
        let notes = this.eyeNotes
        let r = this.currentRace
        let color = this.cEye == "" ? r.eyeColors[Math.floor(Math.random() * r.eyeColors.length)] : this.cEye.toLowerCase()
        let note = notes[Math.floor(Math.random() * notes.length)].replace("their",this.pronoun("their"))
        
        return "their "+color+" eyes "+note+"."
    },
    availableClothing: function(){
        let className = this.currentClass.name
        return this.clothes.filter( cloth => {
            if (cloth.classSpecific == false) return true
            else return cloth.classes.includes(className)
        } )
    },
    wornClothes: function(){
        let c = this.availableClothing[Math.floor( Math.random() * this.availableClothing.length )]
        return c
    },
    completeDescription: function(){
        let joiningWords = ["while","and","but","yet"]
        let word = joiningWords[Math.floor( Math.random() * joiningWords.length )]
        let desc = this.wornClothes.description +" "+this.hair.replace('.',' ' +word+ ' ')+this.eye.toLowerCase()
        desc = desc.replace(new RegExp("their", 'g'),this.pronoun("their"))
        desc = desc.replace(new RegExp("them", 'g'),this.pronoun("them"))
        desc = desc.replace(new RegExp("they", 'g'),this.pronoun("they"))
        return this.sentanceCapitalise(desc)
    }
  }
}
</script>

<style lang="scss">
    #regen{
        width:100%;;
    }
    .options{
        padding-bottom: 1px;
    }
</style>


