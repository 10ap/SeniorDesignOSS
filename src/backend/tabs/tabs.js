// convert the above typescript code to javascript

export class Tab {
	constructor() {
		this.url = "";
		this.favicon = "";
		this.counter = 0;
	}

	init(url) {
		this.url = url;
	}

	incCounter() {
		this.counter += 1;
	}

	setFavicon(favicon) {
		this.favicon = favicon;
	}
}
