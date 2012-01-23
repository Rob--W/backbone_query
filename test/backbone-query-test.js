(function() {
  var create;

  module("Backbone Query");

  create = function() {
    return new Backbone.QueryCollection([
      {
        title: "Home",
        colors: ["red", "yellow", "blue"],
        likes: 12,
        featured: true,
        content: "Dummy content about coffeescript"
      }, {
        title: "About",
        colors: ["red"],
        likes: 2,
        featured: true,
        content: "dummy content about javascript"
      }, {
        title: "Contact",
        colors: ["red", "blue"],
        likes: 20,
        content: "Dummy content about PHP"
      }
    ]);
  };

  test("Simple equals query", function() {
    var a, result;
    a = create();
    result = a.query({
      title: "Home"
    });
    equal(result.length, 1);
    return equal(result[0].get("title"), "Home");
  });

  test("Simple equals query (no results)", function() {
    var a, result;
    a = create();
    result = a.query({
      title: "Homes"
    });
    return equal(result.length, 0);
  });

  test("Simple equals query with explicit $equal", function() {
    var a, result;
    a = create();
    result = a.query({
      title: {
        $equal: "About"
      }
    });
    equal(result.length, 1);
    return equal(result[0].get("title"), "About");
  });

  test("$contains operator", function() {
    var a, result;
    a = create();
    result = a.query({
      colors: {
        $contains: "blue"
      }
    });
    return equal(result.length, 2);
  });

  test("$ne operator", function() {
    var a, result;
    a = create();
    result = a.query({
      title: {
        $ne: "Home"
      }
    });
    return equal(result.length, 2);
  });

  test("$lt operator", function() {
    var a, result;
    a = create();
    result = a.query({
      likes: {
        $lt: 12
      }
    });
    equal(result.length, 1);
    return equal(result[0].get("title"), "About");
  });

  test("$lte operator", function() {
    var a, result;
    a = create();
    result = a.query({
      likes: {
        $lte: 12
      }
    });
    return equal(result.length, 2);
  });

  test("$gt operator", function() {
    var a, result;
    a = create();
    result = a.query({
      likes: {
        $gt: 12
      }
    });
    equal(result.length, 1);
    return equal(result[0].get("title"), "Contact");
  });

  test("$gte operator", function() {
    var a, result;
    a = create();
    result = a.query({
      likes: {
        $gte: 12
      }
    });
    return equal(result.length, 2);
  });

  test("$in operator", function() {
    var a, result;
    a = create();
    result = a.query({
      title: {
        $in: ["Home", "About"]
      }
    });
    return equal(result.length, 2);
  });

  test("$nin operator", function() {
    var a, result;
    a = create();
    result = a.query({
      title: {
        $nin: ["Home", "About"]
      }
    });
    equal(result.length, 1);
    return equal(result[0].get("title"), "Contact");
  });

  test("$all operator", function() {
    var a, result;
    a = create();
    result = a.query({
      colors: {
        $all: ["red", "blue"]
      }
    });
    return equal(result.length, 2);
  });

  test("$size operator", function() {
    var a, result;
    a = create();
    result = a.query({
      colors: {
        $size: 3
      }
    });
    equal(result.length, 1);
    return equal(result[0].get("title"), "Home");
  });

  test("$exists operator", function() {
    var a, result;
    a = create();
    result = a.query({
      featured: {
        $exists: true
      }
    });
    return equal(result.length, 2);
  });

  test("$has operator", function() {
    var a, result;
    a = create();
    result = a.query({
      featured: {
        $exists: false
      }
    });
    equal(result.length, 1);
    return equal(result[0].get("title"), "Contact");
  });

  test("$like operator", function() {
    var a, result;
    a = create();
    result = a.query({
      content: {
        $like: "javascript"
      }
    });
    equal(result.length, 1);
    return equal(result[0].get("title"), "About");
  });

  test("$like operator 2", function() {
    var a, result;
    a = create();
    result = a.query({
      content: {
        $like: "content"
      }
    });
    return equal(result.length, 3);
  });

  test("$and operator", function() {
    var a, result;
    a = create();
    result = a.query({
      likes: {
        $gt: 5
      },
      colors: {
        $contains: "yellow"
      }
    });
    equal(result.length, 1);
    return equal(result[0].get("title"), "Home");
  });

  test("$and operator (explicit)", function() {
    var a, result;
    a = create();
    result = a.query({
      $and: {
        likes: {
          $gt: 5
        },
        colors: {
          $contains: "yellow"
        }
      }
    });
    equal(result.length, 1);
    return equal(result[0].get("title"), "Home");
  });

  test("$or operator", function() {
    var a, result;
    a = create();
    result = a.query({
      $or: {
        likes: {
          $gt: 5
        },
        colors: {
          $contains: "yellow"
        }
      }
    });
    return equal(result.length, 2);
  });

  test("$nor operator", function() {
    var a, result;
    a = create();
    result = a.query({
      $nor: {
        likes: {
          $gt: 5
        },
        colors: {
          $contains: "yellow"
        }
      }
    });
    equal(result.length, 1);
    return equal(result[0].get("title"), "About");
  });

  test("Compound Queries", function() {
    var a, result;
    a = create();
    result = a.query({
      $and: {
        likes: {
          $gt: 5
        }
      },
      $or: {
        content: {
          $like: "PHP"
        },
        colors: {
          $contains: "yellow"
        }
      }
    });
    return equal(result.length, 2);
  });

}).call(this);