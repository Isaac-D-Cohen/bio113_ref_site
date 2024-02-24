var num_authors = 1

// equivalent of a struct/class in javascript
const Author = {
    first: "",
    middle: "",
    last: "",

    create: function(first,middle,last){
        const author = Object.create(Author);
        author.first = first;
        author.middle = middle;
        author.last = last;
        return author;
    },

    first_initial: function(){

        if (this.first == "") return "";

        return this.first[0];
    },

    middle_initial: function(){

        if (this.middle == "") return "";

        return this.middle[0];
    },
};


function add_author(){
    num_authors++;

    // make the ids for these names
    var first_id = "author" + num_authors + "_first";
    var middle_id = "author" + num_authors + "_middle";
    var last_id = "author" + num_authors + "_last";

    var first_label = document.createElement("label");
    var middle_label = document.createElement("label");
    var last_label = document.createElement("label");

    var first_input = document.createElement("input");
    var middle_input = document.createElement("input");
    var last_input = document.createElement("input");

    first_label.setAttribute("for", first_id);
    middle_label.setAttribute("for", middle_id);
    last_label.setAttribute("for", last_id);

    first_label.innerHTML="First name: ";
    middle_label.innerHTML="Middle name: ";
    last_label.innerHTML="Last name: ";

    first_input.setAttribute("type", "text");
    middle_input.setAttribute("type", "text");
    last_input.setAttribute("type", "text");

    first_input.setAttribute("id", first_id);
    middle_input.setAttribute("id", middle_id);
    last_input.setAttribute("id", last_id);

    var pre1 = document.createElement("pre");
    var pre2 = document.createElement("pre");
    var pre3 = document.createElement("pre");
    pre1.innerHTML = "  ";
    pre2.innerHTML = "  ";
    pre3.innerHTML = "  ";

    var new_paragraph = document.createElement("p");
    new_paragraph.innerHTML = "Author " + num_authors;
    document.getElementById("author_form").appendChild(new_paragraph);

    document.getElementById("author_form").appendChild(first_label);
    document.getElementById("author_form").appendChild(first_input);
    document.getElementById("author_form").appendChild(pre1);
    document.getElementById("author_form").appendChild(middle_label);
    document.getElementById("author_form").appendChild(middle_input);
    document.getElementById("author_form").appendChild(pre2);
    document.getElementById("author_form").appendChild(last_label);
    document.getElementById("author_form").appendChild(last_input);
    document.getElementById("author_form").appendChild(pre3);

}

function remove_author(){

    if (num_authors == 1) return;

    num_authors--;

    var form = document.getElementById("author_form");

    for (let i=0; i<10; i++){
        form.removeChild(form.lastChild);
    }
}

function produce_citation(){

    var year = document.getElementById("year").value;
    var article_title = document.getElementById("article_title").value;
    var journal_name = document.getElementById("journal_name").value;
    var journal_vol = document.getElementById("journal_vol").value;
    var issue_num = document.getElementById("issue_num").value;
    var pages = document.getElementById("pages").value;

    var authors = collect_authors();

    var full_citation_ending = "" + year + ". " + article_title + ". " + journal_name + ". " + journal_vol + "(" + issue_num + "): " + pages + ".";
    var full_citation_beginning = "" + authors[0].last + ", " + authors[0].first_initial() + authors[0].middle_initial();


    if (authors.length == 1){

        var full_citation = full_citation_beginning + ". " + full_citation_ending;
        var in_text_citation = "(" + authors[0].last + " " + year + ")";

    } else if (authors.length == 2){

        var full_citation = full_citation_beginning + " and " + authors[1].first_initial() + authors[1].middle_initial() + " " + authors[1].last + ". " + full_citation_ending;
        var in_text_citation = "(" + authors[0].last + " & " + authors[1].last + " " + year + ")";

    } else {

        var full_citation = full_citation_beginning + author_list(authors) + full_citation_ending;
        var in_text_citation = "(" + authors[0].last + " et al. " + year + ")";
    }


    var in_text_print = document.getElementById("in_text");
    var full_print = document.getElementById("full");

    in_text_print.innerHTML = "<strong>In text:</strong>  " + in_text_citation;
    full_print.innerHTML = "<strong>For Literature Cited section:</strong>  " + full_citation;
}

function collect_authors(){

    author_names = [];

    for (let i=1; i<=num_authors; i++){

        var first_id = "author" + i + "_first";
        var middle_id = "author" + i + "_middle";
        var last_id = "author" + i + "_last";

        var first = document.getElementById(first_id);
        var middle = document.getElementById(middle_id);
        var last = document.getElementById(last_id);

        author_names.push(Author.create(first.value, middle.value, last.value));
    }

    return author_names;
}

function author_list(authors){

    var list="";
    var last_index = authors.length-1;

    for (let i=1; i<last_index; i++){
        list += ", " + authors[i].first_initial() + authors[i].middle_initial() + " " + authors[i].last;
    }

    list += " and " + authors[last_index].first_initial() + authors[last_index].middle_initial() + " " + authors[last_index].last + ". ";

    return list;
}
