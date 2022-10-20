<template>
    <Layout>
      <PageHeader :title="title" :items="items" />
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 10px;
                "
              >
                <h4 class="card-title">API CREDENTIALS</h4>
                <b-button variant="primary" @click="openModal">
                  Add
                  <i class="ri-add-circle-line align-middle"></i>
                </b-button>
                <b-modal
                  no-close-on-backdrop
                  id="modal-add"
                  title="Add Api"
                  title-class="font-18"
                  @hidden="resetModal"
                  @ok="handleOk"
                >
                  <form class="needs-validation" @submit.prevent="formSubmit">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label for="validationCustom01">Name</label>
                          <input
                            id="validationCustom01"
                            v-model="form.name"
                            type="text"
                            class="form-control"
                            placeholder="Name"
                            value=""
                            :class="{
                              'is-invalid': submitted && $v.form.name.$error,
                            }"
                          />
                          <div
                            v-if="submitted && $v.form.name.$error"
                            class="invalid-feedback"
                          >
                            <span v-if="!$v.form.name.required"
                              >This value is required.</span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <label for="validationCustom01">Api Key</label>
                          <input
                            id="validationCustom01"
                            v-model="form.api_key"
                            type="text"
                            class="form-control"
                            placeholder="Api Key"
                            value=""
                            :class="{
                              'is-invalid': submitted && $v.form.api_key.$error,
                            }"
                          />
                          <div
                            v-if="submitted && $v.form.api_key.$error"
                            class="invalid-feedback"
                          >
                            <span v-if="!$v.form.api_key.required"
                              >This value is required.</span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <label for="validationCustom02">Api Secret</label>
                          <input
                            id="validationCustom02"
                            v-model="form.api_secret"
                            type="text"
                            class="form-control"
                            placeholder="Api Secret"
                            value=""
                            :class="{
                              'is-invalid':
                                submitted && $v.form.api_secret.$error,
                            }"
                          />
                          <div
                            v-if="submitted && $v.form.api_secret.$error"
                            class="invalid-feedback"
                          >
                            <span v-if="!$v.form.api_secret.required"
                              >This value is required.</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </b-modal>
              </div>
  
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Api Key</th>
                      <th>Api Secret</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in rowsCredentials" :key="index">
                      <td>{{ item.name }}</td>
                      <td>{{ item.app_key }}</td>
                      <td>{{ item.app_secret }}</td>
                      <td>
                        <div
                          style=" display: flex;   justify-content: flex-end;  align-items: center; "
                        >
                          <b-button variant="info" @click="editApi(item)" style="margin-right: 10px;">
                            <i class="ri-edit-line align-middle"></i>
                          </b-button>
                          <b-button variant="danger" @click="deleteApi(item.id)">
                            <i class="ri-delete-bin-line align-middle"></i>
                          </b-button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end row -->
    </Layout>
  </template>
  
  <script>
  import Layout from "../../layouts/main";
  import PageHeader from "@/components/page-header";
  import Cookies from "js-cookie";
  import { required } from "vuelidate/lib/validators";
  import Swal from "sweetalert2";
  /**
   * Dashboard component
   */
  export default {
    components: {
      Layout,
      PageHeader,
    },
    data() {
      return {
        editForm: false,
        id_api: 0,
        rowsCredentials: [],
        form: {
          name: "",
          api_key: "",
          api_secret: "",
        },
        submitted: false,
        submitform: false,
        submit: false,
        typesubmit: false,
        title: "FTX",
        items: [
          {
            text: "Home",
          },
          {
            text: "Derivatives",
            active: true,
          },
          {
            text: "FTX",
            active: true,
          },
        ],
      };
    },
    validations: {
      form: {
        name: { required },
        api_key: { required },
        api_secret: { required },
      },
    },
    methods: {
      async deleteById(id){
          this.addTokenBearer();
          await this.axios
          .delete(this.$store.state.back.urlBack + "/delete_api_derivative?id="+id)
          .then((response) => {
            console.log(response);
            this.get_rows_api_credentials()
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((error) => {
            console.log("error", error);
            this.makeToast("danger", "error", error);
          });
      },
      deleteApi(id) {
          
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#34c38f",
          cancelButtonColor: "#f46a6a",
          confirmButtonText: "Yes, delete it!"
        }).then(result => {
          if (result.value) {
              this.deleteById(id)
            
          }
        });
      },
      editApi(item) {
        console.log(item);
        this.editForm = true;
        this.id_api = item.id;
        this.form.name = item.name;
        this.$bvModal.show("modal-add");
      },
      openModal() {
        this.editForm = false;
        this.$bvModal.show("modal-add");
      },
      async get_rows_api_credentials() {
        this.addTokenBearer();
        await this.axios
          .get(
            this.$store.state.back.urlBack + "/get_api_credentials?derivative=2"
          )
          .then((response) => {
            console.log(response);
            this.rowsCredentials = response.data.arrayApis;
          })
          .catch((error) => {
            console.log(error);
            this.makeToast("danger", "error", error);
          });
      },
      addTokenBearer() {
        var token = Cookies.get("fintCurrenUser");
        token = JSON.parse(token);
        this.axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token.token}`;
      },
      makeToast(variant = null, title, content) {
        this.$bvToast.toast(content, {
          title: title,
          variant: variant,
          solid: true,
        });
      },
      closeModal() {
        this.$nextTick(() => {
          this.$bvModal.hide("modal-add");
        });
      },
      async add_api_derivative() {
        this.addTokenBearer();
        await this.axios
          .post(this.$store.state.back.urlBack + "/add_api_derivative", {
            name: this.form.name,
            app_key: this.form.api_key,
            app_secret: this.form.api_secret,
            derivative: 2,
          })
          .then((response) => {
            console.log(response);
            this.closeModal();
            this.get_rows_api_credentials()
          })
          .catch((error) => {
            console.log("error", error);
            this.makeToast("danger", "error", error);
            this.closeModal();
          });
      },
      async edit_api_derivative() {
        this.addTokenBearer();
        await this.axios
          .put(this.$store.state.back.urlBack + "/edit_api_derivative?id="+this.id_api, {
            name: this.form.name,
            app_key: this.form.api_key,
            app_secret: this.form.api_secret,
            derivative: 2,
          })
          .then((response) => {
            console.log(response);
            this.closeModal();
            this.get_rows_api_credentials()
          })
          .catch((error) => {
            console.log("error", error);
            this.makeToast("danger", "error", error);
            this.closeModal();
          });
      },
      formSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }
        {
          console.log("no es invalido");
          if (this.editForm) {
            this.edit_api_derivative();
          } else {
            this.add_api_derivative();
          }
          //ahora si agregar la api a la db
        }
      },
      resetModal() {
        console.log("reset modal");
        this.form.api_key = "";
        this.form.api_secret = "";
        this.submitted = false;
      },
      handleOk(bvModalEvent) {
        bvModalEvent.preventDefault();
        this.formSubmit();
      },
    },
    mounted() {
      this.get_rows_api_credentials();
    },
  };
  </script>
  