<template>
    <div>
        <!-- Page-header start -->
        <page-header
                title="Affichage Citation"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit">
        </page-header>
        <!-- Page-header end -->
        <!-- Scroll - Vertical table start -->
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-9">
                        <h5>AFFICHAGE CITATION</h5>
                    </div>
                    <div class="col-md-3">
                        <router-link to="/citation/add" tag="a" class="btn btn-primary btn-square btn-out float-right"><i class="ti-plus"></i>Ajouter une citation</router-link>
                    </div>
                </div>
            </div>
            <div class="card-block">
                <div class="dt-responsive table-responsive">
                    <table id="scr-vrt-dt"
                           class="table table-striped table-bordered flex-md-nowrap ">
                        <thead>
                            <tr class="table-secondary">
                                <th class="w-75">TITRE</th>
                                <th class="w-25">IMAGE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="citation in getAllCitations" :key="citation.citation_id">
                                <td>{{citation.titre}}</td>
                                <td><img :src="citation.media" alt="" class="img-fluid img-thumbnail shadow image-size"></td>
                                <td>
                                    <div class="float-right py-2">
                                        <router-link :to="`/citation/edit/${citation.citation_id}`" class="btn btn-facebook btn-sm btn-out m-2"><i class="ti-pencil"></i>modifier</router-link>
                                        <button type="button" @click.prevent="deleteCitation(citation.citation_id)" class="btn btn-danger btn-sm btn-out"><i class="ti-trash"></i>supprimer</button>
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
        name: "viewCitationComponent",

        mounted() {
            this.$store.dispatch("allCitation");
        },
        computed:{
            getAllCitations(){
                return this.$store.getters.getCitation;
            }
        },
        methods:{
            deleteCitation(id){
                //dialog before deleting
                this.$swal({
                    buttonsStyling: true,
                    title: 'Etes vous sûr?',
                    text: "de vouloir supprimer définitivement cette citation ?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Oui',
                    cancelButtonText: 'Non',
                    reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        //XHR request Do deleting
                        axios.get('https://enhakkore.rtgroup-rdc.com/citation/citationSuppression?citation_id='+id)
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
                                this.$store.dispatch("allCitation");
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