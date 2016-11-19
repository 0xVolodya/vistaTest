$(document).ready(function () {
    var presentList,
        quitingList;
    $(".tabs__control--link").on('click', function (e) {
        e.preventDefault();
        $this=$(this);
        var item = $this.closest(".tabs__control--item"),
            itemIndex = item.index(),
            tabList = $('.tabs__item'),
            tabsControll=$(".tabs__control--item"),
            tabsControllIndex=tabsControll.index($this.closest(".tabs__control--item"));
        tabList.eq(itemIndex)
            .addClass("active")
            .siblings()
            .removeClass("active");
        tabsControll.eq(tabsControllIndex)
            .addClass("active-link")
            .siblings()
            .removeClass("active-link");

    });


    $.when(ajax1(), ajax2()).done(function () {
        $(".table tr").on("click", function (e) {
            e.preventDefault();
            $this=$(this);

            var tabs__item=$this.closest(".tabs__item");
            var index = $(".tabs__item").index(tabs__item);
            var currentClass=tabs__item.hasClass("presented") ? 0 : 1;
            var currentTable = currentClass===0 ?  $(".presented")
                : $(".eliminated");
            var currentJson=currentClass===0 ?  presentList : quitingList,
                trs = currentTable.find("tr");
            var jsonIndexTr=trs.index($this);
            //remove all active-tr classes
            trs.eq(trs.index($this))
                .addClass("active-tr")
                .siblings()
                .removeClass("active-tr");
            //end remove all active-tr classes

            var values=$(this).find('td');

            var age = getAge(currentJson[jsonIndexTr-1]["birthDate"]);
            $this.addClass("active-tr");

            $(".fio__value").html(values[1].innerHTML);
            $(".age__value").html(age);
            $(".med__value").html(currentJson[jsonIndexTr-1]["diagnosis"]);

        })
    });

    function getAge(string) {
        var startDate=new Date(string);
        var today = new Date();
        return  Math.floor((today-startDate) / (365.25 * 24 * 60 * 60 * 1000));
    }


    function ajax1() {

        return $.ajax({
            type: 'GET',
            url: 'https://api.myjson.com/bins/2cio2',
            data: {get_param: 'value'},
            dataType: 'json',
            success: function (data) {
                quitingList=data;

                $(".eliminated-count").html(data.length);
                $(".eliminated").html(getTableFromData(data));
            }
        });
    }

    function ajax2() {
        return $.ajax({
            type: 'GET',
            url: 'https://api.myjson.com/bins/4lyrm',
            data: {get_param: 'value'},
            dataType: 'json',
            success: function (data) {
                presentList= data;

                $(".present-count").html(data.length);
                $(".presented").html(getTableFromData(data));
            }
        });

    }

    function getTableFromData(data) {
        var tbl_body = "<table class='table'>";
        tbl_body += "<tr class='table-header'>" + "<td>№ИБ</td>" + "<td>ФИО</td>" + "<td>Палата</td></tr>";
        var odd_even = false;
        $.each(data, function () {
            var data = this;
            var tbl_row = "<tr>";
            tbl_row += "<td>" + data["historyNumber"] + "</td>";

            tbl_row += "<td>" + data["firstName"] + " " + data["lastName"]
                + " " + data["patrName"] + "</td>";

            tbl_row += "<td>" + data["bedNumber"] + "</td>";

            tbl_row += "</tr>";
            tbl_body += tbl_row;
        });
        tbl_body += "</table>";
        return tbl_body;
    }
});