window.Phonebook = {

    API_URL:"http://locahost:8081/phone_book_items",

    getItems: function () {
        $.ajax({
            url: Phonebook.API_URL,
            method: "GET"
        }).done(function (respone) {
            console.log("GET done");
            console.log(respone);

            Phonebook.displayItems(JSON.parse(respone));
        });
    },

    createItem: function (){
       let searchValue = $("#search-field").val();
        var requestBody = {
            search: searchValue
        };

        $.ajax({
            url: Phonebook.API_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            Phonebook.getItems();
        })
    },

    deleteItem: function(id){
        $.ajax({
            url:Phonebook.API_URL + "?id=" + id,
            method: "DELETE",
        }).done(function () {
            Phonebook.getItems();
        })
    },

    displayItems: function (items) {
        var tableContent = "";

        items.forEach(item => tableContent += Phonebook.getItemTableRow(item));

        console.log(tableContent);

        $("#phone_book_items tbody").html(tableContent);
    },

    getItemTableRow: function (item) {
        var checkedDone=item.done ? "checked" : "";

        return `<tr>
            <th>${item.id}</th>
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.nickName}</td>
            <td>${item.phoneNumber}</td>
            <td>${item.emailAdress}</td>
            <td>${item.homeAdress}</td>
            <td><a href="#" class="delete-item" data-id="${item.id}>
            <i class="fas fa-trash-alt"></i></a></td>
        </tr>`
    },

    bindEvents: function () {
        $("#create-item-form").submit(function (event) {
            event.preventDefault();
            Phonebook.createItem();
         })
    }
};

Phonebook.getItems();
Phonebook.bindEvents();