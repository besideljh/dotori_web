<template>
<v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field id="name" label="Movie Name" v-model="name" :rules="nameRules" required></v-text-field>
    <v-text-field id="description" name="input-7-1" label="Movie Description" v-model="description" multi-line></v-text-field>
    <v-select id="release_year" label="Movie Release Year" v-model="release_year" required :rules="releaseRules" :items="years"></v-select>
    <v-text-field id="genre" label="Movie Genre" v-model="genre" required :rules="genreRules"></v-text-field>
    <v-btn id="add_movie_btn" @click="submit" :disabled="!valid">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
</v-form>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        valid: true,
        name: '',
        description: '',
        genre: '',
        release_year: '',
        nameRules: [
            v => !!v || 'Movie name is required',
        ],
        genreRules: [
            v => !!v || 'Movie genre yea is required',
            v => (v && v.length <= 80) || 'Genre must be less than equal to 90 characters.'
        ],
        releaseRules: [
            v => !!v || 'Movie release year is required'
        ],
        select: null,
        years: [
            '2018',
            '2017',
            '2016',
            '2015',
        ],
    }),
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                const movie = {
                    name: this.name,
                    description: this.description,
                    release_year: this.release_year,
                    genre: this.genre,
                }
                this.$store.dispatch("addMovie", movie);
                this.$refs.form.reset();
                this.$router.push({
                    name: 'Home'
                });
            }
            return true;
        },
        clear() {
            this.$refs.form.reset();
        },
    },
};
</script>
