//tb.js
//http://docs.handsontable.com/0.32.0/tutorial-introduction.html
var tb = {
  init: function() {
    this.container = document.getElementById('example');
    this.btn = document.getElementById('j-btn');
    
    this.create();
    this.bindEvent();
  },
  bindEvent: function() {
    this.btn.addEventListener('click', function(e) {
      var input = document.getElementById('j-count');
      this.insert(input.value);
    }.bind(this));
  },
  insert: function(count) {
    this.hot.alter('insert_row', this.hot.countRows(), count);
  },
  loadData: function() {
    // return Handsontable.helper.createSpreadsheetData(6, 14);
  },
  create: function() {
    this.hot = new Handsontable(this.container, {
      data: this.loadData(),
      rowHeaders: true,
      allowEmpty: true,
      colHeaders: ['订单号', '生产编号', '引物名称', '序列', 'nmol总量', 'nmol/tube', 'OD总量', 'OD/tube', '纯化方式', '5修饰', '3修饰', '中间修饰', '特殊单体', '备注'],
      columns: [
        {type: 'numeric'},
        {type: 'numeric'},
        {type: 'text'},
        {type: 'text'},
        {type: 'numeric'},
        {type: 'numeric'},
        {type: 'numeric'},
        {type: 'text'},
        {
          type: 'autocomplete',
          source: function(query, callback) {
            fetch('/api/v1/columns').then(function(response) {
              return response.json();
            }).then(function(res) {
              callback(res.method);
            });
          }
        },
        {
          type: 'autocomplete',
          source: function(query, callback) {
            fetch('/api/v1/columns').then(function(response) {
              return response.json();
            }).then(function(res) {
              callback(res.decor);
            });
          }
        },
        {type: 'text'},
        {type: 'text'},
        {type: 'text'},
        {type: 'text'},
      ],
      afterSelectionEnd: function(r, c, r2, c2) {
        // console.log(r, c, r2, c2)
      },
      afterChange: function(changes, source) {
        if (!changes) return;

        if (source === 'edit') {
          var startCol = 4;
          var endCol = 6;
          for (var i = 0; i < changes.length; i++) {
            var row = changes[i][0];
            var col = changes[i][1];

            var y = changes[i][3];
            var x = this.getDataAtCell(row, col === startCol ? startCol + 1 : startCol);

            if (changes[i][1] === startCol || changes[i][1] === startCol + 1) {
              this.setDataAtCell(row, endCol, x * y);
            }
          }
        }
      }
    });
  }
};

tb.init();