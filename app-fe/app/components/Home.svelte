<script lang="ts">
  let message: string = "Ciao Sono la app della pizza ";
</script>

<page>
  <actionBar title="Home" />
  <gridLayout>
    <label class="info">
      <formattedString>
        <span class="fas" text="&#xf135;" />
        <span text=" {message}" />
      </formattedString>
    </label>
  </gridLayout>
</page>

<style>
  .info .fas {
    color: #3a53ff;
  }

  .info {
    font-size: 20;
    horizontal-align: center;
    vertical-align: center;
  }
</style>
