$(document).ready(function() {
  const model = {
    currentCat: null,
    adminPanelVisible: false,
    catArr: [
      {
        catName: "Cucu",
        clickCounter: 0,
        imgUrl:
          "https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg"
      },
      {
        catName: "Fluffy",
        clickCounter: 0,
        imgUrl:
          "https://pbs.twimg.com/profile_images/953631791256137730/Mq-GwMYZ.jpg"
      },
      {
        catName: "Puss",
        clickCounter: 0,
        imgUrl:
          "https://www.chewy.com/petcentral/wp-content/uploads/2018/05/523476821_kaola251_iStock_Thinkstock2.jpg"
      },
      {
        catName: "Tiger",
        clickCounter: 0,
        imgUrl:
          "https://whateveryousaydarling.files.wordpress.com/2017/02/929d3d9f76f406b5ac6020323d2d32dc.jpg"
      },
      {
        catName: "Oscar",
        clickCounter: 0,
        imgUrl: "https://pbs.twimg.com/media/CaQQd9dW0AQafU1.jpg"
      }
    ]
  };
  const controller = {
    init: function() {
      model.currentCat = model.catArr[0];
      listView.init();
      displayView.init();
      adminPanelView.init();
    },
    getCatArr: function() {
      return model.catArr;
    },
    getCurrentCat: function() {
      return model.currentCat;
    },
    setCurrentCat: function(cat) {
      model.currentCat = cat;
    },
    incrementCounter: function() {
      model.currentCat.clickCounter++;
      displayView.render();
    },
    toggleAdminPanel: function() {
      if (model.adminPanelVisible) {
        model.adminPanelVisible = false;
        displayView.$catImg.removeClass('smaller-img');
      } else {
        model.adminPanelVisible = true;
        displayView.$catImg.addClass('smaller-img');
      }
      adminPanelView.render();
    },
    getAdminStatus: function() {
      return model.adminPanelVisible;
    },
    addNewCat: function(obj) {
      let replacedCat = model.catArr.findIndex(function(el){
          return el.catName === model.currentCat.catName
      });
      model.catArr[replacedCat] = obj;
      model.currentCat = model.catArr[replacedCat];
      displayView.render();
      listView.render();
    }
  };
  const listView = {
    init: function() {
      this.$catList = $("ul");
      this.render();
    },
    render: function() {
      this.$catList.html('');
      var catListItem;
      var cats = controller.getCatArr();
      cats.forEach(
        function(cat) {
          catListItem = $(
            `<li>${cat.catName} <img src='${
              cat.imgUrl
            }' class='small-img'></li>`
          );
          this.$catList.append(catListItem);
          catListItem.on("click", function() {
            controller.setCurrentCat(cat);

            displayView.render();
          });
        }.bind(this)
      );
    }
  };
  const displayView = {
    init: function() {
      this.$catName = $(".cat-name");
      this.$clickCounter = $(".click-counter");
      this.$catImg = $(".cat-img");

      this.$catImg.on("click", function() {
        controller.incrementCounter();
      });

      this.render();
    },
    render: function() {
      var currentCat = controller.getCurrentCat();
      this.$catName.html(currentCat.catName);
      this.$clickCounter.html(currentCat.clickCounter);
      this.$catImg.attr("src", currentCat.imgUrl);
    }
  };
  const adminPanelView = {
    init: function() {
      this.$form = $("#add-cat");
      this.$panel = $(".admin-panel");
      this.$button = $(".admin-panel button");
      // this.$submitButton = $('.submit');
      this.$button.on("click", function() {
        controller.toggleAdminPanel();
        $('.submit').on('click', function(){
          let catName = $('input[type="text"]:first-of-type').val();
          let imgUrl = $('input[type="text"]:nth-of-type(2)').val();
          let clickCounter = $('input[type="text"]:last-of-type').val();

          let newCat = {
            catName: catName,
            imgUrl: imgUrl,
            clickCounter: clickCounter
          }
          controller.addNewCat(newCat);
          controller.toggleAdminPanel();
        });
      });


      // this.render();
    },
    render: function() {
      if (controller.getAdminStatus()) {
        let formHtml = $(`      <label for ='input-cat-name'>Cat Name</label>
      <input type='text' id='input-cat-name' class='input-field'>
      <label for ='input-cat-img'>Cat Url</label>
      <input type='text' id='input-cat-img' class='input-field'>
      <label for ='input-cat-clicks'>Clicks</label>
      <input type='text' id='input-cat-clicks' class='input-field'>
<button class='submit'>Save</button>`);

        this.$form.append(formHtml);
      } else {
        this.$form.html("");
      }
    }
  };
  controller.init();
});
