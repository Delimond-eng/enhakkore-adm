<template>
    <div>
        <!-- Page-header start -->
        <page-header
                title="Création Citation"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit">
        </page-header>
        <!-- Page-header end -->

        <!-- Page-body start -->
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
                            <form enctype="multipart/form-data" ref="citationForm">
                                <div class="form-group has-success row" id="hasSuccess">
                                    <div class="col-sm-12">
                                        <label class="col-form-label font-weight-bold" for="title">Titre de la citation<sup class="text-c-pink">*</sup></label>
                                    </div>
                                    <div class="col-sm-12">
                                        <input type="text"
                                               class="form-control form-control-primary"
                                               id="title" v-model="form.titre">
                                        <div class="col-form-label" v-if="hasEmpty">{{messageTitle}}<i class="feather icon-alert-circle"></i> </div>
                                    </div>
                                </div>
                                <div class="form-group has-success row" id="fileSuccess">
                                    <div class="col-sm-12">
                                        <label for="fichier" class="col-form-label font-weight-bold">Charger l'image d'Exhortation ici...<sup class="text-c-pink">*</sup></label>
                                    </div>
                                    <div class="col-sm-12">
                                        <input type="file" name="fichier" id="fichier" ref="fichier" multiple="multiple" @change="uploadImage($event)" class="form-control form-control-primary">
                                        <div class="col-form-label" v-if="hasEmpty">{{messageFile}}<i class="feather icon-alert-circle"></i> </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 col-xl-6" v-if="isUploaded">
                                        <img :src="img" class="img-fluid img-thumbnail" width="350">
                                    </div>
                                </div>
                                <br>
                                <button v-if="isShow===false" class="btn btn-primary btn-out shadow" @click.prevent="submitData()">
                                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                                    {{btnText}}
                                </button>
                                <button v-if="isShow===true" class="btn btn-facebook btn-out shadow" @click.prevent="updateData()">
                                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                                    {{btnText}}
                                </button>
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
        name: "CitationComponent",

        data(){
            return{
                singleCitation:[],
                img:'',
                form: new Form({
                    titre:'',
                    file:'',
                }),
                headerTitle:'',
                isShow:false,
                isUploaded :false,
                hasEmpty:false,
                messageTitle :'',
                messageFile:'',
                isLoading:false,
                btnText:''
            }
        },
        created(){
            if (this.$route.path==='/citation/add'){
                this.headerTitle="INSERTION";
                this.btnText ="CREER CITATION";
                this.isShow=false;
            }else{
                this.headerTitle="MODIFICATION";
                this.btnText ="MODIFIER CITATION";
                this.isShow=true;
            }
        },
        mounted(){
            axios.get('https://enhakkore.rtgroup-rdc.com/citation/citationAffichageRetour?citation_id='+this.$route.params.id)
                .then((response)=>{
                    this.singleCitation = response.data.reponse.Data;
                    for (let i = 0; i < this.singleCitation.length; i++) {
                        this.form.titre = this.singleCitation[i].titre;
                        this.isUploaded = true;
                        this.img = this.singleCitation[i].media;
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
        },
        methods:{
            submitData(){
                let formData = new FormData();
                formData.append("titre",this.form.titre);
                formData.append("fichier", this.form.file);
                //var
                let Elt = document.getElementById("hasSuccess");
                let fileSuccess = document.getElementById("fileSuccess");
                let title = document.getElementById("title");
                let fs = document.getElementById("fichier");

                //cdt if empty

                if (this.form.titre ==='' || this.form.file===''){

                    Elt.classList.remove('has-success');
                    Elt.classList.add('has-danger');

                    fileSuccess.classList.remove('has-success');
                    fileSuccess.classList.add('has-danger');

                    title.classList.remove('form-control-primary');
                    title.classList.add('form-control-danger');

                    fs.classList.remove('form-control-primary');
                    fs.classList.add('form-control-danger');

                    this.messageTitle ='vous devez entrer le titre de la citation SVP ';
                    this.messageFile ='vous devez charger un fichier image ';

                    this.hasEmpty =true;
                }
                else if(this.form.titre.length < 10){

                    Elt.classList.remove('has-success');
                    Elt.classList.add('has-danger');

                    fileSuccess.classList.remove('has-success');
                    fileSuccess.classList.add('has-danger');

                    title.classList.remove('form-control-primary');
                    title.classList.add('form-control-danger');
                    this.messageTitle ='Le titre de la citation doit avoir au moins 10 caractère ';
                    this.hasEmpty =true;
                }
                //alternative
                else {
                    Elt.classList.remove('has-danger');
                    Elt.classList.add('has-success');


                    this.btnText ='Exécution...'
                    this.isLoading =true;

                    // declare a request interceptor
                    var optionAxios = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                    axios.post('https://enhakkore.rtgroup-rdc.com/citation/citationInsertion', formData,optionAxios)
                        .then((response)=> {
                            this.isLoading = false;
                            this.btnText ='CREER CITATION';
                            let status = response.data.reponse.status;
                            if (status ==='success'){
                                this.$router.push('/citation/view');
                                this.$swal(
                                    '',
                                    'La création de la citation est effectuée!',
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
                formData.append("citation_id",this.$route.params.id)
                formData.append("titre",this.form.titre);
                formData.append("fichier", this.form.file);
                //dialog before updating

                //var
                let Elt = document.getElementById("hasSuccess");
                let title = document.getElementById("title");

                if(this.form.titre===''){
                    Elt.classList.remove('has-success');
                    Elt.classList.add('has-danger');

                    title.classList.remove('form-control-primary');
                    title.classList.add('form-control-danger');

                    this.messageTitle ='vous devez entrer le titre de la citation SVP ';
                    this.hasEmpty =true;
                }
                else if(this.form.titre.length < 10){

                    Elt.classList.remove('has-success');
                    Elt.classList.add('has-danger');

                    title.classList.remove('form-control-primary');
                    title.classList.add('form-control-danger');
                    this.messageTitle ='Le titre de la citation doit avoir au moins 10 caractère ';
                    this.hasEmpty =true;
                }
                else{
                    this.$swal({
                        buttonsStyling: true,
                        title: 'Etes vous sûr?',
                        text: "de vouloir modifier cette citation ?",
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Oui',
                        cancelButtonText: 'Non',
                        reverseButtons: true
                    }).then((result) => {
                        if (result.value) {

                            this.btnText ='Exécution...'
                            this.isLoading =true;
                            //XHR request Do Update Post

                            var optionAxios = {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            };
                            axios.post('https://enhakkore.rtgroup-rdc.com/citation/citationModification', formData,optionAxios)
                                .then((response)=> {
                                    let status = response.data.reponse.status;
                                    if (status ==='success'){
                                        this.$router.push('/citation/view');
                                        this.$swal({
                                            toast: true,
                                            showConfirmButton: false,
                                            position:'bottom-end',
                                            timer: 2000,
                                            timerProgressBar: true,
                                            icon: 'success',
                                            title: "La citation a été modifiée avec succès!"
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

            },
            uploadImage(event){
                this.form.file = this.$refs.fichier.files[0];
                let fileSuccess = document.getElementById("fileSuccess");
                let inputImage = document.getElementById("fichier");

                let file = event.target.files[0];

                if (file.size > 1048576){
                    alert("Desolé! cette image est invalide");
                }
                else{
                    let reader = new FileReader();

                    reader.onload = event => {
                        this.img = event.target.result;
                        fileSuccess.classList.remove('has-danger');
                        fileSuccess.classList.add('has-success');

                        inputImage.classList.remove('form-control-danger');
                        inputImage.classList.add('form-control-primary');
                        this.hasEmpty =false;
                    };
                    reader.readAsDataURL(file);
                    this.isUploaded=true
                }
            },

        }
    }
</script>
