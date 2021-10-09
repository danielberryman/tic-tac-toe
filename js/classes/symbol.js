export class Symbol {
    name;
    image;

    constructor(name, image) {
        this.name = name;
        this.image = image;
    }

    get name() {
        return this.name;
    }

    get image() {
        return this.image;
    }
}