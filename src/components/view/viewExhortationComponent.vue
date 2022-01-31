<template>
    <div>
        <!-- Page-header start -->
        <page-header
                title="Affichage Exhortations"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit">
        </page-header>
        <!-- Page-header end -->
        <!-- Scroll - Vertical table start -->
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-9">
                        <h5>AFFICHAGE EXHORTATION</h5>
                    </div>
                    <div class="col-md-3">
                        <router-link to="/exhortation/add" tag="a" class="btn btn-primary btn-square btn-out float-right"><i class="ti-plus"></i>Ajouter une exhortation</router-link>
                    </div>
                </div>
            </div>
            <div class="card-block">
                <div class="dt-responsive table-responsive">
                    <table id="scr-vrt-dt"
                           class="table table-striped table-bordered flex-md-nowrap">
                        <thead>
                            <tr class="table-secondary">
                                <th class="w-50">TITRE</th>
                                <th>CONTENU</th>
                                <th class="w-25">IMAGE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="exhortation in getAllExhortations" :key="exhortation.exhortation_id">
                                <td>{{exhortation.titre}}</td>
                                <td>{{exhortation.texte | sortlength( 50,"...")}}</td>
                                <td><img :src="exhortation.media" alt="" class="img-fluid img-thumbnail shadow image-size"></td>
                                <td>
                                    <div class="float-right py-2">
                                        <router-link :to="`/exhortation/edit/${exhortation.exhortation_id}`" tag="a" class="btn btn-facebook btn-sm btn-out m-2"><i class="ti-pencil"></i>modifier</router-link>
                                        <button type="button" @click.prevent="deleteExhortation(exhortation.exhortation_id)" class="btn btn-danger btn-sm btn-out"><i class="ti-trash"></i>supprimer</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- Scroll - Vertical table end -->
        <page-footer></page-footer>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "viewExhortationComponent",

        mounted() {
            this.$store.dispatch("allExhortation")
        },
        computed:{
            getAllExhortations(){
                return this.$store.getters.getExhortation;
            }
        },
        methods:{
            deleteExhortation(id){
                //dialog before deleting
                this.$swal({
                    buttonsStyling: true,
                    title: 'Etes vous sûr?',
                    text: "de vouloir supprimer définitivement cette Exhortation ?"+id,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Oui',
                    cancelButtonText: 'Non',
                    reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        //XHR request Do deleting
                        axios.get('https://enhakkore.rtgroup-rdc.com/exhortation/exhortationSuppression?exhortation_id='+id)
                            .then((res)=>{
                                let status = res.data.reponse.status;
                                if (status ==="success"){
                                    //if success
                                    this.$swal({
                                        toast: true,
                                        showConfirmButton: false,
                                        position:'bottom-end',
                                        timer: 2000,
                                        timerProgressBar: true,
                                        icon: 'success',
                                        title: "la citation a été supprimée avec succès!"
                                    });
                                }
                                else{
                                    //if request isn't success
                                    this.$swal({
                                        toast: true,
                                        showConfirmButton: false,
                                        position:'top-end',
                                        timer: 2000,
                                        timerProgressBar: true,
                                        icon: 'error',
                                        title: "Une erreur est survenue lors du lancement du requête!"
                                    });
                                }
                            })
                            .catch((error)=> {
                                console.log(error);
                            })
                            .finally(()=>{
                                this.$store.dispatch("allExhortation");
                            })

                    } else {
                        //error
                        this.$swal({
                            toast: true,
                            showConfirmButton: false,
                            position:'bottom-end',
                            timer: 2000,
                            timerProgressBar: true,
                            icon: 'warning',
                            title: "La citation n'a pas été supprimée!"
                        })
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>