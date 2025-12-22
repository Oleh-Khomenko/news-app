<script setup lang="ts">
// assets
import EmailIcon from '@/assets/icons/email-icon.svg?component';
import PhoneIcon from '@/assets/icons/phone-icon.svg?component';
</script>

<template>
  <footer>
    <div class="footer-content">
      <p class="copyright">Copyright 2025 Test. All rights reserved.</p>

      <div class="contacts">
        <a href="mailto:info@test.com">
          <EmailIcon />
          <span>info@test.com</span>
        </a>
        <a href="tel:+380953908751">
          <PhoneIcon />
          <span>+380 95 390 87 51</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';
@use '@/assets/styles/typography';
@use '@/assets/styles/colors';
@use '@/assets/styles/mixins';

footer {
  box-shadow: 0 -4px 10px 0 colors.$color-shadow;

  div.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: variables.$max-content-width;
    margin: 0 auto;
    padding: 1.375rem 2rem;

    @include mixins.for-md-width {
      flex-direction: column-reverse;
      gap: 1rem;
      padding: 1rem 1.5rem;
    }

    @include mixins.for-sm-width {
      padding: 0.875rem 1rem;
    }

    p.copyright {
      @include typography.small-text-regular;
    }

    div.contacts {
      @include typography.small-text-regular;

      display: flex;
      align-items: center;
      gap: 1.5rem;

      @include mixins.for-sm-width {
        flex-direction: column;
        gap: 0.75rem;
      }

      a {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        transition: color 0.3s ease-in-out;

        &:hover {
          color: colors.$color-purple
        }
      }
    }
  }
}
</style>
