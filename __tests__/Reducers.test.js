import { facebook, instagram } from '.,/Reducers'


test('FB_NEXT', () => {
	expect(
		facebook(
		undefined, {
			type: 'FB_NEXT',
			next: 'Janek'
		})
	)
	.toBe({
		next: 'Janek',
	})
})

test('FB_FETCH', () => {
	expect(
		facebook({
			friends: ['Franek'],
			follows: ['whatever'],
			next: 'Ala',
		}, {
			type: 'FB_NEXT',
			list: ['Janek'],
			next: 'Janek',
		})
	)
	.toBe({
		friends: ['Franek', 'Janek'],
		follows: ['whatever'],
		next: 'Janek',
	})
})


