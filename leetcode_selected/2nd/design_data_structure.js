//1603.Design a parking system
/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
var ParkingSystem = function (big, medium, small) {
    this.map = new Map();
    this.map.set(1, big);
    this.map.set(2, medium);
    this.map.set(3, small)
};

/** 
 * @param {number} carType
 * @return {boolean}
 */
ParkingSystem.prototype.addCar = function (carType) {
    if (this.map.get(carType) > 0) {
        this.map.set(carType, this.map.get(carType) - 1);
        return true;
    }
    return false;
};

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */
