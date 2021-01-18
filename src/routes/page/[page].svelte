<script context="module">
    export function preload ({ params }) {
      return {
        currentPage: +params.page
      }
    }
  </script>
  
  <script>
    import Main from '../../components/Main.svelte'
    export let currentPage
  </script>
  
  <Main {currentPage}/>