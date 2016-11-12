define({ "api": [
  {
    "type": "get",
    "url": "/product",
    "title": "Request Product list",
    "name": "GetProducts",
    "group": "Product",
    "version": "2.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "products",
            "description": "<p>List of Products</p>"
          }
        ]
      }
    },
    "filename": "controllers/product.js",
    "groupTitle": "Product"
  }
] });
