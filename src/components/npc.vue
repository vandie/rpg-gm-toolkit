<template>
  <div class="columns">
      <div class="column">
          <div class="section">
            <div class="card">
                <div class="card-content">
                    <b-field label="Race">
                        <b-select placeholder="No race selected" v-model="selRace">
                            <option v-for="(race, index) in races" v-bind:key="index" v-bind:value="index">{{race.name}}</option>
                        </b-select>
                    </b-field>
                    <b-field label="Sex">
                        <b-select placeholder="No sex selected" v-model="sex">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </b-select>
                    </b-field>
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
                    <h4> Sex : {{sex}} </h4>
                    <h4> Height : {{stature.writtenHeight}} </h4>
                    <h4> Weight : {{stature.writtenWeight}} </h4>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import raceData from "../assets/data/raceData.json"

export default {
  name:"NPC",
  data: function(){
      return {
          races: raceData.races,
          selRace: 0,
          sex: "male"
      }
  },
  computed:{
      currentRace: function(){
          return this.races[this.selRace]
      },
      stature: function(){
          let maxDie = this.currentRace.stature.heightWeightRoll[this.sex]
          let roll = Math.floor( Math.random() * (maxDie-2) ) + 2
          let heightInches = this.currentRace.stature.baseHeightInches[this.sex]+roll
          let weight = this.currentRace.stature.baseWeight[this.sex]+( roll * this.currentRace.stature.weightMultiplyer[this.sex] )

          let remainder = heightInches % 12
          let feet = (heightInches - remainder)/12

          return {
              heightInches: heightInches,
              writtenHeight: feet+" ft "+remainder+'"',
              weight: weight,
              writtenWeight: weight+" lbs"
          }
      },
      name: function(){
          if (this.currentRace.firstNames){
              return this.currentRace.firstNames[this.sex][Math.floor(Math.random()*this.currentRace.firstNames[this.sex].length-1)] +" "+ this.currentRace.surnames[Math.floor(Math.random()*this.currentRace.surnames.length-1)]
          } else return "N/A"
      }
  }
}
</script>

<style lang="scss">

</style>


