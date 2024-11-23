var SiteName = document.getElementById("bookmarkName");
var SiteUrl = document.getElementById("bookmarkURL");

var arrayItem = JSON.parse(localStorage.getItem("items")) || [];

Display();

function AddItem() {
    if (!SiteName.value.trim() || !SiteUrl.value.trim()) {
        window.alert("Please fill in both the Site Name and URL.");
        return;
    }

    if (!isValidURL(SiteUrl.value.trim())) {
        window.alert("Invalid URL. The URL must start with http:// or https://");
        return;
    }

    var item = {
        site: SiteName.value.trim(),
        url: SiteUrl.value.trim(),
    };

    arrayItem.push(item);
    localStorage.setItem("items", JSON.stringify(arrayItem)); 
    Display();


    SiteName.value = "";
    SiteUrl.value = "";
    
}

function Display() {
    var cartona = ``;
    for (let i = 0; i < arrayItem.length; i++) {
        cartona += `
            <tr>
                <td>${i + 1}</td>
                <td>${arrayItem[i].site}</td>              
                <td>
                  <button onclick="Visit(${i})" class="btn btn-visit" data-index="${i}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button onclick="Delete(${i})" class="btn btn-delete " data-index="${i}">
                    <i class="fa-solid fa-trash-can pe-2"></i>Delete
                  </button>
                </td>
            </tr>
        `;
    }
    document.getElementById("tableContent").innerHTML = cartona;
}

function Delete(index) {
    arrayItem.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(arrayItem)); 
    Display();
}

function Visit(index) {
    let url = arrayItem[index].url.startsWith("http") ? arrayItem[index].url : `https://${arrayItem[index].url}`;
    window.open(url, "_blank");
}

function isValidURL(url) {
    const regex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
    return regex.test(url);
}


