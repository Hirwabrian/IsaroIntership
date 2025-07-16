/**
 * Represents a collection of tree data in GeoJSON format.
 *
 * @constant {Object} treeData
 * @property {string} type - The type of the GeoJSON object, always "FeatureCollection".
 * @property {Array<Object>} features - An array of feature objects representing individual trees.
 * @property {string} features[].type - The type of the feature, always "Feature".
 * @property {Object} features[].geometry - The geometry of the feature.
 * @property {string} features[].geometry.type - The type of geometry, always "Point".
 * @property {Array<number>} features[].geometry.coordinates - The coordinates of the tree [longitude, latitude].
 * @property {Object} features[].properties - The properties of the tree.
 * @property {number} features[].properties.id - The unique identifier of the tree.
 * @property {string} features[].properties.ownerEmail - The email of the tree's owner.
 * @property {string} features[].properties.name - The name of the tree.
 * @property {string} features[].properties.species - The species of the tree.
 * @property {number} features[].properties.planetedYear - The year the tree was planted.
 * @property {number} features[].properties.co2Offset - The CO2 offset provided by the tree in tons.
 * @property {string} features[].properties.description - A description of the tree.
 * @property {Array<string>} features[].properties.images - An array of image URLs associated with the tree.
 */
export const treeData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [29.7406, -2.3505],
      },
      properties: {
        id: 1,
        ownerEmail: "user1@example.com",
        name: "Umuvumu Tree",
        species: "Ficus thonningii",
        planetedYear: 2015,
        co2Offset: 0.5,

        description: "A historic tree near the King's Palace.",
        images: [
          "/images/tree-image.jpg",
          "/images/tree-image.png",
          "/images/tree-image.jpg",
          "/images/tree-image.jpg",
          "/images/tree-image.png",
          "/images/tree-image.jpg",
        ],
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [29.738, -2.344],
      },
      properties: {
        id: 2,
        ownerEmail: "user1@example.com",
        name: "Igiti Kirekire",
        species: "Eucalyptus grandis",
        planetedYear: 2018,
        co2Offset: 0.8,
        description: "A tall eucalyptus tree standing near the main road.",
        images: [
          "/images/tree-image.jpg",
          "/images/tree-image.png",
          "/images/tree-image.jpg",
          "/images/tree-image.jpg",
          "/images/tree-image.png",
          "/images/tree-image.jpg",
        ],
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [29.7452, -2.3488],
      },
      properties: {
        id: 3,
        ownerEmail: "user1@example.com",
        name: "Inkingi ubwatsi",
        species: "Acacia abyssinica",
        planetedYear: 2020,
        co2Offset: 1.2,
        description:
          "A strong acacia tree providing shade in a village square.",
        images: [
          "/images/tree-image.jpg",
          "/images/tree-image.png",
          "/images/tree-image.jpg",
          "/images/tree-image.jpg",
          "/images/tree-image.png",
          "/images/tree-image.jpg",
        ],
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [29.75, -2.355],
      },
      properties: {
        id: 4,
        ownerEmail: "demo@example.com",
        name: "Igiti Ibanga",
        species: "Albizia gummifera",
        planetedYear: 2019,
        co2Offset: 0.6,
        description: "A tree with cultural significance in local traditions.",
        images: [
          "/images/tree-image.jpg",
          "/images/tree-image.png",
          "/images/tree-image.jpg",
          "/images/tree-image.jpg",
          "/images/tree-image.png",
          "/images/tree-image.jpg",
        ],
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [29.735, -2.34],
      },
      properties: {
        id: 5,
        ownerEmail: "demo@example.com",
        name: "Umurama",
        species: "Grevillea robusta",
        planetedYear: 2021,
        co2Offset: 0.9,
        description: "A fast-growing tree commonly found in farms.",
        images: [
          "/images/tree-image.jpg",
          "/images/tree-image.png",
          "/images/tree-image.jpg",
          "/images/tree-image.jpg",
          "/images/tree-image.png",
          "/images/tree-image.jpg",
        ],
      },
    },
  ],
};
