<script>
    import Posts from './Posts/index.svelte'
    export let currentPage = 1
  </script>

  <style>

  </style>
  
  
  <div class="homepage page">
    <Posts {currentPage}/>
  </div>