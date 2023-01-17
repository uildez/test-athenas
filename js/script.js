$(() => {
  const employeesStore = new DevExpress.data.ArrayStore({
    key: "ID",
    data: employees,
  });

  const dataGrid = $("#gridContainer")
    .dxDataGrid({
      dataSource: employeesStore,
      onToolbarPreparing: function (e) {
        var dataGrid = e.component;
        var addBbuttonItem = e.toolbarOptions.items.filter(function (e) {
          return e.name === "addRowButton";
        })[0];
        addBbuttonItem.showText = "always";
        addBbuttonItem.options.stylingMode = "contained";
        addBbuttonItem.options.type = "default";
        addBbuttonItem.options.text = "Add person";
        addBbuttonItem.location = "before";
        addBbuttonItem.options.cssClass = "button-class-add";
      },
      sorting: {
        mode: "single",
      },
      rowAlternationEnabled: true,
      paging: {
        pageSize: 10,
      },
      pager: {
        showInfo: true,
        displayMode: "compact",
        infoText: "Showing {0} to {1} ({2} items) entries",
      },
      onContentReady: function (e) {
        if (!e.component.__ready) {
          e.component.__ready = true;
          $sizeChooser = $("<div/>", {
            id: "pageSizeChooser",
            style: "display:block; float:left",
          });
          $("#gridContainer .dx-datagrid-pager").append($sizeChooser);
          $("#pageSizeChooser")
            .dxNumberBox({
              width: 100,
              min: 1,
              max: 1000,
              value: e.component.option("paging.pageSize"),
              onValueChanged: (args) => {
                e.component.option("paging.pageSize", args.value);
              },
            })
            .before("<div style='float:left; margin:7px'>Showing: </div>")
            .after("<div style='float:left; margin:7px'>entries </div>");
        }
      },
      searchPanel: {
        visible: true,
        highlightCaseSensitive: true,
      },
      editing: {
        mode: "popup",
        allowUpdating: true,
        allowAdding: true,
        allowDeleting: true,
        confirmDelete: true,
        useIcons: false,
      },
      columns: [
        "FirstName",
        "LastName",
        { dataField: "Gender", dataType: "string", width: 150 },
        "Address",
        {
          dataField: "Date of Birth",
          dataType: "date",
          width: 150,
        },
        {
          dataField: "Actions",
          type: "buttons",
          width: 250,
          buttons: [
            { name: "edit", cssClass: "dx-button-edit" },
            { name: "delete", cssClass: "dx-button-delete" },
            "save",
            "cancel",
          ],
        },
      ],
      onSelectionChanged(data) {
        dataGrid.option(
          "toolbar.items[1].options.disabled",
          !data.selectedRowsData.length
        );
      },
    })
    .dxDataGrid("instance");
});
