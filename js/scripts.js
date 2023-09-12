var words_box = document.getElementById('words');
var word_box = document.getElementById('word');
var letter_box = document.getElementById('letters_box');
var win = document.getElementById('win');
var main_list  ;
var letters_list ;
var numbers = 0 ;
var num = 0;


function check_localStorage(){
    let key = Object.keys(localStorage).length;

    if(key == 0){
        localStorage.setItem('level',1);
    }
    start_level();
    
}

function start_level(){
    
    var level = localStorage.getItem('level');
    $('#level').text(level);
    
    $.ajax({
        url: "../json/levels.json",
        success:function(r){
            
            main_list = r.levels[level].main_list;
            letters_list = r.levels[level].letters_list;
            numbers = main_list.length;
            set_words(main_list);
        }
    });

}


function set_words(l){
    num = 0;
    for (let i = 0; i<l.length;i++) {
        let letters = l[i];
        if(letters.length > num){
            num = letters.length;
        }

        var box = document.createElement('div');
        box.classList.add('box');

        for(let x = 0;x<letters.length;x++){
            let letter = document.createElement('div');
            letter.classList.add('letter_box');
            box.appendChild(letter);
            
        }
        words_box.appendChild(box);
        
    }
    set_word(letters_list);

}

function set_word(n){
    for(let y = 0 ;y<n.length;y++){

        document.getElementById(`letter${y}`).innerHTML = n[y];
        document.getElementById(`letter${y}`).style.backgroundColor = 'white';
        document.getElementById(`letter${y}`).style.display = 'flex';

    }
    add_to_word_box();
    
    
}

function add_to_word_box(){
    $(document).ready(function(){
        $('.letters').click(function(){
            let text = this.innerHTML;
            let div = document.createElement('div');
            div.innerHTML = text;
            div.classList.add('letter_box');
            word_box.appendChild(div);
            check_litters();
        })
        
    })
}

function check_litters(){
    let litters =  word_box.children;
    let txt = '';
    let flag = false;   

    for(let l = 0;l<litters.length;l++){
        txt +=  litters[l].innerHTML;
    }
    for(let main = 0;main<main_list.length;main++){
        if (txt == main_list[main]){
            flag = true;
            main_list[main] = 'pass';
            set_letters_in_words_box(txt);
            break;
        }
    }
    
    if(txt.length >= num && flag == false){
        setTimeout(function(){
            word_box.innerHTML = '';
        },200)
    }
}

function set_letters_in_words_box(text){
    let w_box = words_box.children;
    for(let w = 0;w<w_box.length;w++){
        if(w_box[w].children.length == text.length){
            if(w_box[w].children[0].innerHTML.length == 0){
                
                for(let li = 0; li<w_box[w].children.length;li++){
                    w_box[w].children[li].innerHTML = text[li];
                }
                clear_word_box();
                numbers--;
                break;
            }
            
        }       
    }
    check_all();
}


function check_all(){
    if( numbers == 0 ){
        let level = Number(localStorage.getItem('level'))+1;
        localStorage.setItem('level',level);
        
        $('#NextLevel').text(level);
        $('#OldLevel').text(level-1);
        $('#win').removeClass('d-none');
        $('#win').addClass('d-flex');
        
    }
    
}

$('#refresh').click(function(){
    word_box.innerHTML = '';
})

$('#NextLevelBTN').click(function(){
    location.reload();
})

function clear_word_box(){
    word_box.innerHTML = '';
}

check_localStorage();