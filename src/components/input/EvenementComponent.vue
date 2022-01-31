<template>
	<div>
		<!-- Page-header start -->
        <page-header title="Création Evénement" description="Lorem ipsum dolor sit amet"></page-header>
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
                            <form enctype="multipart/form-data" ref="EventForm">
                                <div class="form-group has-success row" id="boxTitle">
                                    <div class="col-sm-12">
                                        <label class="col-form-label font-weight-bold" for="title">Titre de l'Evénement <sup class="text-c-pink">*</sup></label>
                                    </div>
                                    <div class="col-sm-12">
                                        <input type="text"
                                               class="form-control form-control-primary"
                                               id="title" v-model="form.title">
                                        <div class="col-form-label" v-if="hasEmpty">{{messageTitle}}<i class="feather icon-alert-circle"></i> </div>
                                    </div>
                                </div>
                                <div class="form-group has-success row" id="boxDate">
                                    <div class="col-sm-12">
                                        <label class="col-form-label font-weight-bold" for="dateEvent">Date de l'Evénement <sup class="text-c-pink">*</sup></label>
                                    </div>
                                    <div class="col-sm-6">
                                        <input class="form-control form-control-primary"
                                               v-model="form.dateEvent" type="date" id="dateEvent"/>
                                        <div class="col-form-label" v-if="hasEmpty">{{messageDate}}<i class="feather icon-alert-circle"></i> </div>
                                    </div>
                                    <div class="col-sm-2">
                                        <input class="form-control form-control-primary"
                                               id="heure" type="time"/>
                                    </div>
                                </div>
                                <div class="form-group has-success row" id="boxFile">
                                    <div class="col-sm-12">
                                        <label class="col-form-label font-weight-bold" for="img">Charger l'image de l'Evénement ici...<sup class="text-c-pink">*</sup></label>
                                    </div>
                                    <div class="col-sm-12">
                                        <input type="file" name="files[]" ref="fichier" multiple="multiple" id="img" @change="uploadImage($event)" class="form-control form-control-primary">
                                        <div class="col-form-label" v-if="hasEmpty">{{messageFile}}<i class="feather icon-alert-circle"></i> </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 col-xl-6" v-if="isUploaded">
                                        <img :src="img" class="img-fluid img-thumbnail" width="350">
                                    </div>
                                </div>
                                <br>
                                <button v-if="showBtn===false" class="btn btn-primary btn-out shadow" @click.prevent="submitData">CREER EVENEMENT</button>
                                <button v-if="showBtn===true" class="btn btn-facebook btn-out shadow" @click.prevent="updateData">MODIFIER EVENEMENT</button>
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
        name: "EvenementComponent",
        data(){
            return{
                img:'',
                form: new Form({
                    title:'',
                    dateEvent:'',
                    file:'',
                }),
                headerTitle:'',
                messageDate:'',
                messageFile:'',
                isUploaded:false,
                showBtn:false,
                hasEmpty:''
            }
        },
        created(){
            if (this.$route.path==='/evenement/add'){
                this.headerTitle="INSERTION";
                this.showBtn=false;
            }else{
                this.headerTitle="MODIFICATION"
                this.showBtn=true;
            }
        },
        mounted(){
            axios.get('https://enhakkore.rtgroup-rdc.com/evenement/evenementAffichageRetour?evenement_id='+this.$route.params.id)
                .then((response)=>{
                    this.dataArray = response.data.reponse.Data;
                    for (let i = 0; i < this.dataArray.length; i++) {
                        this.form.title = this.dataArray[i].titre;
                        this.form.dateEvent = this.dataArray[i].date_evenement;
                        this.isUploaded = true;
                        this.img = this.dataArray[i].media;
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
        },
        methods:{
            submitData(){
                let formData = new FormData();
                let houreInput = document.getElementById('heure');
                formData.append("titre",this.form.title);
                formData.append("date_evenement", this.form.dateEvent +" "+ houreInput.value);
                formData.append("fichier", this.form.file);

                //DOM component
                let boxTitle = document.getElementById("boxTitle");
                let boxDate = document.getElementById("boxDate");

                let boxImage = document.getElementById("boxFile");
                let titleInput = document.getElementById("title");
                let dateInput = document.getElementById("dateEvent");
                let imgInput = document.getElementById("img");

                if (this.form.title ==='' ||
                    this.form.dateEvent==='' ||
                    this.form.file ==='')
                {
                    boxTitle.classList.remove('has-success');
                    boxTitle.classList.add('has-danger');

                    boxDate.classList.remove('has-success');
                    boxDate.classList.add('has-danger');

                    boxImage.classList.remove('has-success');
                    boxImage.classList.add('has-danger');

                    titleInput.classList.remove('form-control-primary');
                    titleInput.classList.add('form-control-danger');
                    this.messageTitle ='Vous devez entrer le titre de l\'Evénement ';

                    dateInput.classList.remove('form-control-primary');
                    dateInput.classList.add('form-control-danger');

                    houreInput.classList.remove('form-control-primary');
                    houreInput.classList.add('form-control-danger');
                    this.messageDate = 'La date et l\'heure de l\'Evénement sont requises ';

                    imgInput.classList.remove('form-control-primary');
                    imgInput.classList.add('form-control-danger');

                    this.messageFile ='Vous devez charger un fichier image ';
                    this.hasEmpty = true;
                }
                else if(this.form.title.length < 10){

                    boxTitle.classList.remove('has-success');
                    boxTitle.classList.add('has-danger');

                    titleInput.classList.remove('form-control-primary');
                    titleInput.classList.add('form-control-danger');
                    this.messageTitle ='Le titre de l\'Exhortation doit avoir au moins 10 caractères ';
                    this.hasEmpty = true;
                }
                else{
                    let optionAxios = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    };
                    axios.post('https://enhakkore.rtgroup-rdc.com/evenement/evenementInsertion', formData,optionAxios)
                        .then((response)=> {
                            let status = response.data.reponse.status;
                            if (status ==='success'){
                                this.$router.push('/evenement/view');
                                this.$swal(
                                    '',
                                    'La création de l\'Evénement est effectuée!',
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
                formData.append("evenement_id",this.$route.params.id)
                formData.append("titre",this.form.title);
                formData.append("date_evenement",this.form.dateEvent);
                formData.append("fichier", this.form.file);
                //dialog before updating

                //DOM component
                let boxTitle = document.getElementById("boxTitle");
                let boxDate = document.getElementById("boxDate");
                let titleInput = document.getElementById("title");
                let dateInput = document.getElementById("dateEvent");
                let houreInput = document.getElementById('heure');

                if (this.form.title ==='' ||
                    this.form.dateEvent==='')
                {
                    boxTitle.classList.remove('has-success');
                    boxTitle.classList.add('has-danger');

                    boxDate.classList.remove('has-success');
                    boxDate.classList.add('has-danger');

                    titleInput.classList.remove('form-control-primary');
                    titleInput.classList.add('form-control-danger');
                    this.messageTitle ='Vous devez entrer le titre de l\'Evénement ';

                    dateInput.classList.remove('form-control-primary');
                    dateInput.classList.add('form-control-danger');

                    houreInput.classList.remove('form-control-primary');
                    houreInput.classList.add('form-control-danger');
                    this.messageDate = 'La date et l\'heure de l\'Evénement sont requises ';
                    this.hasEmpty = true;
                }
                else if(this.form.title.length < 10){

                    boxTitle.classList.remove('has-success');
                    boxTitle.classList.add('has-danger');

                    titleInput.classList.remove('form-control-primary');
                    titleInput.classList.add('form-control-danger');
                    this.messageTitle ='Le titre de l\'Exhortation doit avoir au moins 10 caractères ';
                    this.hasEmpty = true;
                }
                else{
                    this.$swal({
                        buttonsStyling: true,
                        title: 'Etes vous sûr?',
                        text: "de vouloir modifier cet événement ?",
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
                            axios.post('https://enhakkore.rtgroup-rdc.com/evenement/evenementModification', formData,optionAxios)
                                .then((response)=> {
                                    let status = response.data.reponse.status;
                                    if (status ==='success'){
                                        this.$router.push('/evenement/view');
                                        this.$swal({
                                            toast: true,
                                            showConfirmButton: false,
                                            position:'bottom-end',
                                            timer: 2000,
                                            timerProgressBar: true,
                                            icon: 'success',
                                            title: "L'Evénement a été modifiée avec succès!"
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
                let boxImage = document.getElementById("boxImage");
                let dateInput = document.getElementById("dateEvent");
                this.form.file = this.$refs.fichier.files[0];
                let file = event.target.files[0];

                if (file.size > 1048576){
                    alert("Desolé! cette image est invalide");
                }
                else{
                    let reader = new FileReader();

                    reader.onload = event => {
                        this.img = event.target.result;
                        boxImage.classList.remove('has-danger');
                        boxImage.classList.add('has-success');

                        dateInput.classList.remove('form-control-danger');
                        dateInput.classList.add('form-control-primary');
                        this.hasEmpty = false;
                    };
                    reader.readAsDataURL(file);
                    this.isUploaded=true
                }
            },
            resetForm(){
                this.$refs.EventForm.reset();
            }

        }
    }
</script>