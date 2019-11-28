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

    displayItems: function (items) {
        var tableContent = "";

        items.forEach(item => tableContent += Phonebook.getItemTableRow(item));

        console.log(tableContent);

        $("#phone_book_items tbody").html(tableContent);
    },

    getItemTableRow: function (item) {
        var checkedDone=item.done ? "checked" : "";

        return `<tr>
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.nickName}</td>
            <td>${item.phoneNumber}</td>
            <td>${item.emailAdress}</td>
            <td>${item.homeAdress}</td>
            <td><input type="checkbox" class="mark-done" data-id="${item.id}" ${checkedDone}></td>
            <td><a href="#" class="delete-item" data-id="${item.id}>
            <i class="fas fa-trash-alt"></i></a></td>
        </tr>`

    }
};

Phonebook.getItems();