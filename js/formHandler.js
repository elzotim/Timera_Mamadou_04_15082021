$(function()
{$("input,textarea").jqBootstrapValidation({preventSubmit:true,submitSuccess:function($form,event)
{if(!$form.attr('action'))
{event.preventDefault();var processorFile=getProcessorPath($form);var formData={};$form.find("input, textarea, option:selected").each(function(e)
{var fieldData=$(this).val();var fieldID=$(this).attr('id');if($(this).is(':checkbox'))
{fieldData=$(this).is(":checked");}
else if($(this).is(':radio'))
{fieldData=$(this).val()+' = '+$(this).is(":checked");}
else if($(this).is('option:selected'))
{fieldID=$(this).parent().attr('id');}
formData[fieldID]=fieldData;});$.ajax({url:processorFile,type:"POST",data:formData,cache:false,success:function()
{if($form.is('[success-msg]'))
{$form.append("<div id='form-alert'><div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button><strong>"+$form.attr('success-msg')+"</strong></div></div>");}
else
{window.location.replace($form.attr('success-url'));}
$form.trigger("reset");},error:function()
{if($('#form-alert').length==0)
{$form.append("<div id='form-alert'><div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button><strong>"+$form.attr('fail-msg')+"</strong></div></div>");}},});}},filter:function()
{return $(this).is(":visible");},});function getProcessorPath(form)
{var path="./includes/"+form.attr('id')+".php";if(form.attr('template-path'))
{path=form.attr('template-path')+"/includes/"+form.attr('id')+".php";}
return path}});