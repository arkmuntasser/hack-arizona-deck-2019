# Hack Arizona Presentation

At my company, Simpleview, we build websites. A lot of websites; we launched 54 sites last year, that’s just over 1 a week. With pace like we’re always looking for ways to become more efficient without sacrificing quality. That’s where components come in. But how do you make a component library that can power sites that look so different?

I’m Amir, the Senior Developer Lead of CMS Operations at Simpleview and that is the answer I sought to solve last year. Usually, when you see or read about component libraries they handle the visual aspects of a site or app: think Bootstrap or Material Design. That wasn’t going to cut it here; our sites can be quite distinct and it’s a hard sell to a client to convince them to potentially dilute their brand so you can save some development time. No, instead of looking at the designs for component opportunities I looked at the code my developers were writing.

I wanted to know the common challenges my devs encountered when building a site. I’m going to talk to you about 2 of the pain-points I found and how I went about addressing them with components.

First, let me establish the goals for any component in our library.

1. Tightly integrated with our CMS.
2. Provide a better experience for our developers.
3. Improve code quality and accessibility on our sites.

Relatively simple goals. Tight integration with our CMS, because there was no reason to make them generic since they aren't intended for use outside of our system. Provide a better experience for devs; part of the impetous for creating the component library was to remove pain points and frustrations, if a component doesn't achieve this then it fundamentally is a failure. And improve code quality because if I'm going to take the time to do this, then I ought to do it right.

## Writing Better Code Made Easy

With that in mind let’s take a look at the first component: the link.

You might think, Amir, links are easy here, look:

```html
<a href="https://simpleviewinc.com">go there</a>
```

And you would be right… mostly. But sometimes your link needs a `target` and a `rel` and it pretty much always needs a `title`. Those were things that we would often catch mostly newer devs leaving out during code review. This was a perfect low-effort/high-impact opportunity for a component. Our fantastic and very proprietary CMS provides all the data we needed to properly fill those attributes in a handy JSON object called `link`, so I built a component that looks similar to this:

```html
<template>
    <a
        v-if="href"
        :href="href"
        :target="target"
        :title="title"
        :rel="rel"
    >
        <slot>read more</slot>
    </a>
</template>

<script>
export default {
    props: {
        link: {
            type: Object,
            required: true
        }
    },
    computed: {
        href() {
            return this.link.url;
        },
        target() {
            return this.link.target ? this.link.target : '_self';
        },
        title() {
            return this.link.title;
        },
        rel() {
            return this.target === '_blank' ? 'noopener' : undefined;
        }
    }
}
</script>
```

And that means our devs went from having to write this:

```html
<a
	:href="link.url"
	:target="link.target"
	:rel="link.target === '_blank' ? 'noopener' : ''"
	:title="link.title"
>
	click here
</a>
```

to this:

```html
	<hyperlink :link="link">click here</hyperlink>
```

This component can be used on any site, it’s accessible, it improved the code quality, and it’s simpler for the developer.

The next component has to do with images.

Let’s start with the opportunities I found with our images:

1. We were lazy loading, but every developer had their own way to handle lazy loading. No standard. Sometimes several lazy loading solutions existed on a given site.
2. We were compressing and sizing images, but only for the larges size and not using `<picture>` for responsive images.

Lazy loading is pretty simple, it looks something like this:

```html
<template>
	<img v-if="enteredViewport" :src="…" :alt="…" />
	<div v-else class="spacer">
</template>

<script>
export default {
	data() {
		return {
			enteredViewport: false
		}
	},
	mounted() {
		const io = new InstersectionObserver((entries, i) => {
			const entry = entries[0];

			if (entry.intersectionRatio > 0) {
				this.enteredViewport = true;
				io.disconnect();
			}
		});

		io.observe(this.$el);
	}
}
</script>
```

Using an Intersection Observer I can quickly find out when my image crosses into the viewport, flip the `enteredViewport` flag and begin loading the image. Before it loads, I include a spacer to push down content appropriately because nothing sucks like seeing a bit of content that interests you only to have something pop in and push that content below the fold.

Supporting responsive images was a bit more complicated.

```html
<picture v-if="enteredViewport">
	<source v-for="size in sourceSizes"
		:srcset="getImageSrc(size)"
		:media="'(min-width: ' + size + 'px)'"
	>
	<img :src="getImageSrc(default)" alt="…"/>
</picture>
<div v-else class="spacer"></div>

<script>
export default {
	props: ['resource', 'sizes'],
	data() { … },
	mounted() { … },
	computed: {
		sourceSizes() {
			return sizes['srcset'];
		},
		default() {
			return sizes['default'];
		}
	},
	methods: {
		getImageSrc(size) {
			return this.resource.getUrl(size);
		}
	}
}
</script>
```

As you can see, we simply iterate over an array of sizes and generate a list of sources for our picture element. And now instead of the developer needing to write their own lazy loader and look up how to use `<picture>`, which I’ll admit I need to hit up MDN every time I intend to use it, they can simply write something like this:

```html
<hyperimage
	:resource="resource"
	:sizes="{
		default: { width: …, height: … },
		srcset: {
			1440:  { width: …, height: … },
			1024:  { width: …, height: … },
			768:  { width: …, height: … },
			480:  { width: …, height: … },
		}
	}"
></hyperimage>
```

Here resource is something our CMS provides us that contains all the data about an image as well as a number of helpful functions to apply transforms via our CDN, Cloudinary.

Does this meet all the items on our checklist? You bet it does!

## A SaaS front end to match our SaaS back end

So now we have these great foundational components that we can use to build larger more complex components all the way up to widgets and apps. And that's when things get really exciting!

As I've mentioned, at Simpleview we have our own CMS; we licence it to our clients as a SaaS product. That's Software as a Service for those not hip to the lingo. What that means is that our CMS gets continuosly updated with new features and our client's don't need to install anything, dowload anything, request anything, they just get a more stable and powerful CMS on a regular basis. That's incredibly powerful as company that not only creates a platform, but is also the primary user of the platform. We don't build sites on anything other than our CMS. And that presented a unique problem.

Our Product team could build a feature and push it out to every client, the client could immediatly begin using it, but depending on the feature, the front end of their site, might not be able to use the feature without an update. And I mean an update to every client that could want to use the new feature.

For example, we released a new feature called *focal point* that enabled a user to select the focus of an image so that when we cropped the image, it would always crop around the focal point. Simple enough. Client could immediately go into their asset libraries and start setting focal points on all their images, but their websites couldn't actually make use of the focal point without a minor single line update per image per widget per client. That's 100s of clients with 10s of widgets. At that scale, even a single line update starts to look pretty daunting.

But, as you might imagine, there's a happy ending to this story. Components to the rescue! Remember my hyperimage component from earlier in the talk. Well every image is being loaded via that component. And that singular component lives in a single repo that gets deployed to all our clients. I just update that one component with the focal point update and every image and every site gains the new functionality. It really becomes a single line update.

And that's at the small scale. Remember, there are whole widgets and apps in our component library as well. If a client is using one of our core components on their site and we find that that component is underperforming, has a bug, be more accessible, or whatever, then we can just update it in one place and every client gets. Sometimes client request features of us, if they have a good idea (and they often do) then we upgrade one of our components with the requested feature and not only does the original client get it, but so do the rest of our clients.

It's a total revolution in the way we think about and build websites. And it all started with me making a link component.

## Closing

I’m Amir, you can follow me on Twitter, I’m @arkmuntasser. If you have any questions, comments, or just want to say hi, I’ll be hanging around for while so feel free to to come up to me if you see me. And if you really liked what I had to say here today, then check out Simpleview’s careers page; we’re looking to hire a bunch of developers.

Thank you
