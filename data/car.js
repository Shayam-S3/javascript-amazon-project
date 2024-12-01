class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    displayInfo() {
        const trunkStatus = this.isTrunkOpen ? 'opened' : 'closed';
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}`);
    }

    go() {
        if (this.speed <= 195 && !this.isTrunkOpen) {
            this.speed += 5;
        }
    }

    brake() {
        if (this.speed >= 5) {
            this.speed -= 5;
        }
    }

    openTrunk() {
        if (speed === 0) {
            this.isTrunkOpen = true;
        }

    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car {
    acceleration;

    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }
    go() {
        this.speed += this.acceleration;

        if (this.speed > 300) {
            this.speed = 300;
        }
    }

    openTrunk() {
        console.log('Race cars do not have a trunk.');
    }

    closeTrunk() {
        console.log('Race cars do not have a trunk.');
    }
}

const toyota = new Car({ brand: 'Toyoto', model: 'Corolla' });
const tesla = new Car({ brand: 'Tesla', model: 'Model 3' });
const raceCar = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
});