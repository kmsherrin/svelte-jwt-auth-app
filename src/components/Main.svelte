<script>
    import Posts from './Posts/index.svelte'
    export let currentPage = 1
  </script>
  
  
  <div class="homepage page">
    <Posts {currentPage}/>
  </div>