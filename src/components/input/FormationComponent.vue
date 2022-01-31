<template>
	<div>
		<!-- Page-header start -->
        <page-header title="Création de la Formation" description="Lorem.."></page-header>
        <!-- Page-header end -->
        
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
                            <form enctype="multipart/form-data" ref="Form">
                                <div class="form-group has-success row" id="hasSuccess">
                                    <div class="col-sm-12">
                                        <label class="col-form-label font-weight-bold" for="title">Titre de la Formation <sup class="text-c-pink">*</sup> </label>
                                    </div>
                                    <div class="col-sm-12">
                                        <input type="text"
                                               class="form-control form-control-primary" v-model="form.title"
                                               id="title" placeholder="Entrer le titre de la formation">
                                        <div class="col-form-label" v-if="hasEmpty"> {{messageTitle}} <i class="feather icon-alert-circle"></i> </div>
                                    </div>

                                </div>

                                <div class="form-group has-success row" id="fileSuccess">
                                    <div class="col-sm-12">
                                        <label class="col-form-label font-weight-bold" for="img">Charger l'image de la formation ici... <sup class="text-c-pink">*</sup> </label>
                                    </div>
                                    <div class="col-sm-12">
                                        <input type="file" name="files[]" ref="fichier" multiple="multiple" @change="uploadImage($event)" class="form-control form-control-primary" id="img">
                                        <div class="col-form-label" v-if="hasEmpty"> {{messageFile}} <i class="feather icon-alert-circle"></i> </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 col-xl-6" v-if="isUploaded">
                                        <img :src="img" class="img-fluid img-thumbnail" width="350">
                                    </div>
                                </div>
                                <br>
                                <button v-if="isShow===false" class="btn btn-primary btn-out shadow" @click.prevent="submitData">CREER FORMATION</button>
                                <button v-if="isShow===true" class="btn btn-facebook btn-out shadow" @click.prevent="updateData">MODIFIER FORMATION</button>
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
	export default{
		name:"FormationComponent",
        data(){
            return{
                img:'',
                form: new Form({
                    file:'',
                    title:''
                }),
                headerTitle:'',
                isShow:false,
                isUploaded:false,
                hasEmpty:false,
                messageTitle :'',
                messageFile :'',
                dataArray:[]
            }
        },
        created(){
            if (this.$route.path==='/formation/add'){
                this.headerTitle="INSERTION";
                this.isShow=false;
            }else{
                this.headerTitle="MODIFICATION"
                this.isShow=true;
            }
        },
        mounted(){
            axios.get('https://enhakkore.rtgroup-rdc.com/formation/formationAffichageRetour?formation_id='+this.$route.params.id)
                .then((response)=>{
                    this.dataArray = response.data.reponse.Data;
                    for (let i = 0; i < this.dataArray.length; i++) {
                        this.form.title = this.dataArray[i].titre;
                        this.isUploaded = true;
                        this.img = this.dataArray[i].media;
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
        },
        methods:{
            submitData(){
                let formData = new FormData();
                formData.append("titre",this.form.title);
                formData.append("fichier", this.form.file);
                //DOM element
                let Elt = document.getElementById("hasSuccess");
                let title = document.getElementById("title");
                let fileSuccess = document.getElementById("fileSuccess");
                let inputImage = document.getElementById("img");

                if (this.form.title ===''){

                    Elt.classList.remove('has-success');
                    Elt.classList.add('has-danger');

                    fileSuccess.classList.remove('has-success');
                    fileSuccess.classList.add('has-danger');

                    title.classList.remove('form-control-primary');
                    title.classList.add('form-control-danger');

                    inputImage.classList.remove('form-control-primary');
                    inputImage.classList.add('form-control-danger');

                    this.messageTitle = 'vous devez entrer le titre de la formation SVP ';
                    this.messageFile = 'vous devez charger un fichier image ';
                    this.hasEmpty =true;
                }
                else if(this.form.title.length < 10){
                    Elt.classList.remove('has-success');
                    Elt.classList.add('has-danger');
                    title.classList.remove('form-control-primary');
                    title.classList.add('form-control-danger');
                    this.message = 'Le titre de la formation doit avoir au moins 10 caractères ';
                    this.hasEmpty =true;
                }
                else{
                    var optionAxios = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                    axios.post('https://enhakkore.rtgroup-rdc.com/formation/formationInsertion', formData,optionAxios)
                        .then((response)=> {
                            let status = response.data.reponse.status;
                            if (status ==='success'){
                                this.$router.push('/formation/view');
                                this.$swal(
                                    '',
                                    'La création de la Formation est effectuée!',
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
                formData.append("formation_id",this.$route.params.id)
                formData.append("titre",this.form.title);
                formData.append("fichier", this.form.file);
                //dialog before updating

                //DOM element
                let Elt = document.getElementById("hasSuccess");
                let title = document.getElementById("title");

                if (this.form.title ===''){

                    Elt.classList.remove('has-success');
                    Elt.classList.add('has-danger');

                    title.classList.remove('form-control-primary');
                    title.classList.add('form-control-danger');

                    this.messageTitle = 'vous devez entrer le titre de la formation SVP ';
                    this.hasEmpty =true;
                }
                else if(this.form.title.length < 10){
                    Elt.classList.remove('has-success');
                    Elt.classList.add('has-danger');
                    title.classList.remove('form-control-primary');
                    title.classList.add('form-control-danger');
                    this.message = 'Le titre de la formation doit avoir au moins 10 caractères ';
                    this.hasEmpty =true;
                }
                else{
                    this.$swal({
                        buttonsStyling: true,
                        title: 'Etes vous sûr?',
                        text: "de vouloir modifier cette Formation ?",
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
                            axios.post('https://enhakkore.rtgroup-rdc.com/formation/formationModification', formData,optionAxios)
                                .then((response)=> {
                                    let status = response.data.reponse.status;
                                    if (status ==='success'){
                                        this.$router.push('/formation/view');
                                        this.$swal({
                                            toast: true,
                                            showConfirmButton: false,
                                            position:'bottom-end',
                                            timer: 2000,
                                            timerProgressBar: true,
                                            icon: 'success',
                                            title: "La formation a été modifiée avec succès!"
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
                let file = event.target.files[0];
                let fileSuccess = document.getElementById("fileSuccess");
                let inputImage = document.getElementById("img");

                if (file.size > 1048576){
                    alert("Desolé! cette image est invalide");
                }
                else{
                    let reader = new FileReader();

                    reader.onload = event => {
                        this.img = event.target.result
                        fileSuccess.classList.remove('has-danger');
                        fileSuccess.classList.add('has-success');

                        inputImage.classList.remove('form-control-danger');
                        inputImage.classList.add('form-control-primary');
                        this.hasEmpty =false;
                    };
                    reader.readAsDataURL(file);
                    this.isUploaded = true;
                }
            },
            resetForm(){
                this.$refs.Form.reset();
            }
        }
	}
</script>