<template>
    <div>
        <!-- Page-header start -->
        <page-header title="Création Exhortations" description="Lorem ipsum dolor sit amet"></page-header>
        <!-- Page-header end -->
        <div class="page-body">
            <div class="row">
                <div class="col-sm-12">
                    <!-- Input card start -->
                    <div class="card">
                        <div class="card-header">
                            <div class="card-header-right"><i
                                    class="icofont icofont-spinner-alt-5"></i></div>
                        </div>
                        <div class="card-block">
                            <h4 class="sub-title">{{headerTitle}}</h4>
                            <form enctype="multipart/form-data" ref="ExhortationForm">
                                <div class="form-group has-success row" id="hasTitle">
                                    <div class="col-sm-12">
                                        <label class="col-form-label font-weight-bold" for="title">Titre de l'Exhortation<sup class="text-c-pink">*</sup></label>
                                    </div>
                                    <div class="col-sm-12">
                                        <input type="text"
                                               class="form-control form-control-primary"
                                               id="title" v-model="form.titre">
                                        <div class="col-form-label" v-if="hasEmpty">{{messageTitle}}<i class="feather icon-alert-circle"></i> </div>
                                    </div>
                                </div>
                                <div class="form-group has-success row" id="hasContent">
                                    <div class="col-sm-12">
                                        <label class="col-form-label font-weight-bold" for="contenu">Le contenu de l'Exhortation <sup class="text-c-pink">*</sup> </label>
                                    </div>
                                    <div class="col-sm-12">

                                        <markdown-editor toolbar="bold italic heading | numlist bullist code quote | preview fullscreen"
                                                  name="contenu" class="form-control-primary"
                                                  id="contenu" style="font-size: 1.5em; font-family:Open Sans"
                                                  placeholder="Entrer le contenu de l'Exhortation..."
                                                  v-model="form.content">
                                        </markdown-editor>
                                        <div class="col-form-label" v-if="hasEmpty">{{messageContent}}<i class="feather icon-alert-circle"></i> </div>
                                    </div>
                                </div>
                                <div class="form-group has-success row" id="hasImage">
                                    <div class="col-sm-12">
                                        <div class="col-form-label font-weight-bold">Charger l'image d'Exhortation ici...<sup class="text-c-pink">*</sup></div>
                                    </div>
                                    <div class="col-sm-12">
                                        <input type="file" name="files[]" ref="fichier" multiple="multiple" @change="uploadImage($event)" class="form-control form-control-primary" id="img">
                                        <div class="col-form-label" v-if="hasEmpty">{{messageFile}}<i class="feather icon-alert-circle"></i> </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 col-xl-6" v-if="isUploaded">
                                        <img :src="img" class="img-fluid img-thumbnail" width="350">
                                    </div>
                                </div>
                                <br>
                                <button v-if="showBtn===false" class="btn btn-primary btn-out shadow" @click.prevent="submitData">CREER EXHORTATION</button>
                                <button v-if="showBtn===true" class="btn btn-facebook btn-out shadow" @click.prevent="updateData">MODIFIER EXHORTATION</button>
                            </form>
                        </div>
                    </div>
                    <!-- Input Validation card end -->
                </div>
            </div>
        </div>
        <!-- Page body end -->

        <!-- footer start -->
        <page-footer></page-footer>
        <!-- footer end -->
    </div>
</template>

<script>
    import axios from 'axios';
    import Form from 'vform';
    export default {
        name: "ExhortationComponent",
        data(){
            return{
                img:'',
                form: new Form({
                    titre:'',
                    content:'',
                    file:'',
                }),
                isUploaded:false,
                headerTitle:'',
                messageTitle:'',
                messageFile:'',
                messageContent:'',
                hasEmpty:false,
                showBtn:false,
                dataArray : []
                
            }
        },
        created(){
            if (this.$route.path==='/exhortation/add'){
                this.headerTitle="INSERTION";
                this.showBtn=false;
            }else{
                this.headerTitle="MODIFICATION"
                this.showBtn=true;
            }
        },
        mounted(){
            axios.get('https://enhakkore.rtgroup-rdc.com/exhortation/exhortationAffichageRetour?exhortation_id='+this.$route.params.id)
                .then((response)=>{
                    this.dataArray = response.data.reponse.Data;
                    for (let i = 0; i < this.dataArray.length; i++) {
                        this.form.titre = this.dataArray[i].titre;
                        this.form.content = this.dataArray[i].texte;
                        this.isUploaded = true;
                        this.img = this.dataArray[i].media;
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
        },
        methods:{
            uploadImage(event){
                let hasImage = document.getElementById("hasImage");
                let imgInput = document.getElementById("img");
                this.form.file = this.$refs.fichier.files[0];
                let file = event.target.files[0];

                if (file.size > 1048576){
                    alert("Desolé! cette image est invalide");
                }
                else{
                    let reader = new FileReader();

                    reader.onload = event => {
                        this.img = event.target.result;
                        hasImage.classList.remove('has-danger');
                        hasImage.classList.add('has-success');
                        imgInput.classList.remove('form-control-danger');
                        imgInput.classList.add('form-control-primary');
                        this.hasEmpty = false;
                    };
                    reader.readAsDataURL(file);
                    this.isUploaded=true
                }
            },
            submitData(){
                let formData = new FormData();
                formData.append("titre",this.form.titre);
                formData.append("texte", this.form.content);
                formData.append("fichier", this.form.file);

                //DOM componennt
                let hasTitle = document.getElementById("hasTitle");
                let hasContent = document.getElementById("hasContent");
                let hasImage = document.getElementById("hasImage");
                let titleInput = document.getElementById("title");
                let contentInput = document.getElementById("contenu");
                let imgInput = document.getElementById("img");

                if (this.form.titre ==='' || this.form.content==='' || this.form.file===''){
                    hasTitle.classList.remove('has-success');
                    hasTitle.classList.add('has-danger');

                    hasContent.classList.remove('has-success');
                    hasContent.classList.add('has-danger');

                    hasImage.classList.remove('has-success');
                    hasImage.classList.add('has-danger');

                    titleInput.classList.remove('form-control-primary');
                    titleInput.classList.add('form-control-danger');
                    this.messageTitle ='Vous devez entrer le titre de l\'Exhortation ';

                    contentInput.classList.remove('form-control-primary');
                    contentInput.classList.add('form-control-danger');
                    this.messageContent = 'Vousb devez Entrer le contenu de l\'Exhortation ';

                    imgInput.classList.remove('form-control-primary');
                    imgInput.classList.add('form-control-danger');

                    this.messageFile ='Vous devez charger un fichier image ';
                    this.hasEmpty = true;

                } else if(this.form.titre.length < 10 || this.form.content < 10){
                    hasTitle.classList.remove('has-success');
                    hasTitle.classList.add('has-danger');

                    hasContent.classList.remove('has-success');
                    hasContent.classList.add('has-danger');

                    hasImage.classList.remove('has-success');
                    hasImage.classList.add('has-danger');

                    titleInput.classList.remove('form-control-primary');
                    titleInput.classList.add('form-control-danger');
                    this.messageTitle ='Le titre de l\'Exhortation doit avoir au moins 10 caractères ';

                    contentInput.classList.remove('form-control-primary');
                    contentInput.classList.add('form-control-danger');
                    this.messageContent = 'Le contenu de l\'Exhortation doit avoir au moins 10 caractères';

                    imgInput.classList.remove('form-control-primary');
                    imgInput.classList.add('form-control-danger');

                    this.messageFile ='Vous devez charger un fichier image ';
                    this.hasEmpty = true;
                }
                else{
                    var optionAxios = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                    axios.post('https://enhakkore.rtgroup-rdc.com/exhortation/exhortationInsertion', formData,optionAxios)
                        .then((response)=> {
                            let status = response.data.reponse.status;
                            if (status ==='success'){
                                this.$router.push('/exhortation/view');
                                this.$swal(
                                    '',
                                    'La création de l\'Exhortation est effectuée!',
                                    'success'
                                );
                            }
                            else {
                                this.$swal(
                                    '',
                                    'votre fichier doit etre au format(jpg, jpeg, gif ou png)!',
                                    'warning'
                                )
                            }

                        })
                        .catch((error)=> {
                            console.log(error);
                        })
                        .finally(()=>{
                            this.resetForm();
                        })
                }
            },
            updateData(){
                let formData = new FormData();
                formData.append("exhortation_id",this.$route.params.id)
                formData.append("titre",this.form.titre);
                formData.append("texte", this.form.content);
                formData.append("fichier", this.form.file);
                //dialog before updating

                //DOM componennt
                let hasTitle = document.getElementById("hasTitle");
                let hasContent = document.getElementById("hasContent");
                let titleInput = document.getElementById("title");
                let contentInput = document.getElementById("contenu");


                if (this.form.titre ==='' || this.form.content==='' || this.form.file===''){
                    hasTitle.classList.remove('has-success');
                    hasTitle.classList.add('has-danger');

                    hasContent.classList.remove('has-success');
                    hasContent.classList.add('has-danger');

                    titleInput.classList.remove('form-control-primary');
                    titleInput.classList.add('form-control-danger');
                    this.messageTitle ='Vous devez entrer le titre de l\'Exhortation ';

                    contentInput.classList.remove('form-control-primary');
                    contentInput.classList.add('form-control-danger');
                    this.messageContent = 'Vousb devez Entrer le contenu de l\'Exhortation ';
                    this.hasEmpty = true;

                } else if(this.form.titre.length < 10 || this.form.content < 10){
                    hasTitle.classList.remove('has-success');
                    hasTitle.classList.add('has-danger');

                    hasContent.classList.remove('has-success');
                    hasContent.classList.add('has-danger');

                    titleInput.classList.remove('form-control-primary');
                    titleInput.classList.add('form-control-danger');
                    this.messageTitle ='Le titre de l\'Exhortation doit avoir au moins 10 caractères ';

                    contentInput.classList.remove('form-control-primary');
                    contentInput.classList.add('form-control-danger');
                    this.messageContent = 'Le contenu de l\'Exhortation doit avoir au moins 10 caractères';
                    this.hasEmpty = true;
                }
                else{
                    this.$swal({
                        buttonsStyling: true,
                        title: 'Etes vous sûr?',
                        text: "de vouloir modifier cette exhortation ?",
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Oui',
                        cancelButtonText: 'Non',
                        reverseButtons: true
                    }).then((result) => {
                        if (result.value) {
                            //XHR request Do Update Post
                            var optionAxios = {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            };
                            axios.post('https://enhakkore.rtgroup-rdc.com/exhortation/exhortationModification', formData,optionAxios)
                                .then((response)=> {
                                    let status = response.data.reponse.status;
                                    if (status ==='success'){
                                        this.$router.push('/exhortation/view');
                                        this.$swal({
                                            toast: true,
                                            showConfirmButton: false,
                                            position:'bottom-end',
                                            timer: 2000,
                                            timerProgressBar: true,
                                            icon: 'success',
                                            title: "L'Exhortation a été modifiée avec succès!"
                                        });
                                        console.log(status);
                                    }
                                    else {
                                        this.$swal(
                                            '',
                                            'votre fichier doit etre au format(jpg, jpeg, gif ou png)!',
                                            'warning'
                                        );
                                        console.log("fichier invalid!");
                                    }

                                })
                                .catch((error)=> {
                                    console.log(error);
                                })

                        } else {
                            //error
                            this.$swal({
                                toast: true,
                                showConfirmButton: false,
                                position:'bottom-end',
                                timer: 2000,
                                timerProgressBar: true,
                                icon: 'info',
                                title: "la modification a été annulée!"
                            })
                        }
                    });
                }
                
            }
        }
    }
</script>