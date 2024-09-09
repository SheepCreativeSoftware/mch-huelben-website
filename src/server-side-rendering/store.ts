import { defineStore } from 'pinia';

export const useFooStore = defineStore('foo-store', {
	state: () => ({
		foo: '',
	}),
	actions: {
		fetchFoo() {
			this.$state.foo = 'foobar2';
		},
	},
});
