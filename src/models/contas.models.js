< div >
    <
    div class = "header-card-despesa" >
    <
    button type = "button"
class = "btn btn-outline-success btn-with-icon"
data - bs - toggle = "modal"
data - bs - target = "#modalConta"
data - bs - whatever = "@mdo" > Adicionar <
    span class = "material-icons align-icon-btn" > add_circle_outline < /span> <
    /button> <
    /div> <
    p class = "titulo-contas" > CONTAS < /p>
    <!-- <div *ngFor="let despesa of lsDespesas"> -->
    <
    p > {
        { lsContas } } < /p> <
    div * ngFor = "let conta of lsContas " >

    <
    div class = "card-conta" >
    <
    div class = "header-card-conta" >
    <
    div >
    <
    p > {
        { $any(conta).banco } } < /p> <
    label > {
        { $any(conta).nome } } < /label> <
    /div> <
    img class = "img-banco"
src = "/assets/images/{{$any(conta).banco}}.png"
alt = "" >

    <
    /div> <
    div class = "valores-conta" >
    <
    div >
    <
    p id = "um" > Receitas < /p> <
    p id = "dois" > {
        { $any(conta).saldo | currency: 'BRL' } } < /p> <
    /div> <
    div >
    <
    p id = "tres" > Despesas < /p> <
    p id = "quatro" > {
        { $any(conta).totalDespesas | currency: 'BRL' } } < /p> <
    /div> <
    /div> <
    div class = "saldo-conta" >
    <
    p id = "um" > Saldo: < /p> <
    p id = "dois" > xxx < /p> <
    /div> <
    /div> <
    /div>
    <!-- </div> -->
    <
    /div>

<!-- MODAL CADASTRO CONTA -->
<
div id = "modal"
class = "modal fade modal-fullscreen-md-down"
id = "modalConta"
tabindex = "-1"
aria - labelledby = "exampleModalLabel"
aria - hidden = "true" >
    <
    div class = "modal-dialog" >
    <
    div class = "modal-content" >
    <
    div class = "modal-header" >
    <
    h5 class = "modal-title"
id = "exampleModalLabel" > Nova conta < /h5> <
    button type = "button"
class = "btn-close"
data - bs - dismiss = "modal"
aria - label = "Close" > < /button> <
    /div> <
    div class = "modal-body" >
    <
    form[formGroup] = "formadicionarConta" >
    <!-- <label for="conta-saldo">Saldo:</label>
    <
    input type = "text"
id = "conta-saldo"
class = "form-control"
formControlName = "saldo" > -->
    <
    div class = "row" >
    <
    div class = "mb-3 col " >
    <
    label
for = "conta-name "
class = "col-form-label" > Nome: < /label> <
    input type = "text "
class = "form-control "
id = "conta-name "
formControlName = "nome"
maxlength = "10" >
    <
    /div> <
    div class = "mb-3 col " >
    <
    label
for = "conta-instituicao "
class = "col-form-label " > Instituição financeira: < /label> <
    select type = "select "
class = "form-control form-select "
id = "conta-instituicao "
formControlName = "banco" >
    <
    option selected > Selecione < /option> <
    option > Santander < /option> <
    option > Nubank < /option> <
    option > Banco do Brasil < /option> <
        option > BV < /option> <
        option > Bradesco < /option> <
        option > C6 < /option> <
        /select> <
        /div> <
        /div> <
        div class = "row " >
        <
        div class = "mb-3 col " >
        <
        label
    for = "conta-tipo "
class = "col-form-label " > Tipo: < /label> <
    select type = "select "
class = "form-control form-select "
id = "conta-tipo "
formControlName = "tipo" >
    <
    option selected > Selecione < /option> <
    option > Conta corrente < /option> <
    option > Conta poupança < /option> <
    /select> <
    /div> <
    div class = "mb-3 col " >
    <
    label
for = "message-text "
class = "col-form-label " > Descrição: < /label> <
    textarea class = "form-control "
id = "message-text "
formControlName = "descricao" > < /textarea> <
    /div> <
    /div> <
    /form> <
    /div> <
    div class = "modal-footer " >
    <
    button type = "button"
class = "btn btn-secondary"
data - bs - dismiss = "modal" > Cancelar < /button> <
    button type = "button "
class = "btn btn-primary"
data - bs - dismiss = "modal" (click) = "criarConta()" > Salvar < /button> <
    /div> <
    /div> <
    /div> <
    /div>
