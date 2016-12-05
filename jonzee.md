Last week I decided to add redux to my react native iOS application. How I get that? Well, sometimes you just have that feeling, that you can improve something in your app, that you can refactor parts of your code, and you feel, that probably someone before you have the same problem with spaghetti code and more over - he resolve this problem and opensource his solution! Bascilly that was this feeling.
I heared about redux (and all this flux/reflux/midx/stuff) earlier and I knew that this helps to manage data flow by providing 'one source of true'. But I never implemented it, so I decided to jump straith to it.

Three things about redux are important:
1. no mutatble the state (well, I knew about this, because of react logic)
2. one source of true (that was exactly what i was looking for!)
3. reducers

My mobile app was pretty complicated, thats why I decided to applied redux step by step:

1. Learn redux from tutorials (redux with react and react native)

2. Learn more about Immutable, and if it will needed - add immutables to redux

3. Combine redux with async requests to API

4. Combine redux with local database (I had realm, but maybe it would need to change lib)


So, step by step how I achieve this:

Ad 1. I looked for tutorials for about 2 hour, I found great (and free!) tutorial on redux with react, I suggested you to check this out, even if you want only use redux with react native (this guy has amazing style of programming it's a pure pleasure to watch how application growth under his keyboard)

Another tutorial I found on youtube, and it only about react native with redux. bonus is that it cover async request to backend, so I have point 3 too.












