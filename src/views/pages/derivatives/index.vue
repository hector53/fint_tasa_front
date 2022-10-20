<script>
    import Layout from "../../layouts/main";
    import PageHeader from "@/components/page-header";
    
    
    
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
          title: "Derivatives",
          items: [
            {
              text: "Home"
            },
            {
              text: "Derivatives",
              active: true
            }, 
            {
              text: this.$route.query.option,
              active: true
            }
          ]
        };
      }
    };
    </script>
    
    <template>
      <Layout>
        <PageHeader :title="title" :items="items" />
        
      </Layout>
    </template>