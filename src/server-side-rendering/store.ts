import { defineStore } from 'pinia';

export const useFooStore = defineStore('foo-store', {
	actions: {
		fetchFoo() {
			this.$state.foo = 'foobar2';
		},
	},
	state: () => ({
		foo: '',
	}),
});
