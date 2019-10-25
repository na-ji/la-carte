import RBush from 'rbush';

export class LocationRBush extends RBush {
  toBBox({ latitude, longitude }) {
    return { minX: latitude, minY: longitude, maxX: latitude, maxY: longitude };
  }

  compareMinX(a, b) {
    return a.latitude - b.latitude;
  }

  compareMinY(a, b) {
    return a.longitude - b.longitude;
  }

  load(data): LocationRBush {
    return super.load(data);
  }
}
