//AGENDAMENTO

$(document).ready(function(){

    $('#cpfP').mask('000.000.000-00');
    $('#contatoP').mask('(00) 00000-0000');
    $('#dataP').mask('00/00/0000');

    $('#cpfPg').mask('000.000.000-00');

    $('#validade-cartao').mask('00/00');

    $('#prox').click(function( event ) {
        event.preventDefault();
        $(this).parents('.tabs').hide(100);
        $(this).parents('.tabs').next().show(100);
    });

    $('#ant').click(function( event ) {
        event.preventDefault();
        $(this).parents('.tabs').hide(100);
        $(this).parents('.tabs').prev().show(100);
    });
    
    $( '#pg-din' ).click(function(){
        $( '.pg-aut' ).hide(100);
    });

    $( '#pg-aut' ).click(function(){
        $( '.pg-aut' ).show(100);
    });

    $( 'input[name=pgAut]' ).on( "click", function() {
        let id = $( "input[name=pgAut]:checked").val();
        $('.aut-form').hide();
        $('#'+id).show();
    });

});

