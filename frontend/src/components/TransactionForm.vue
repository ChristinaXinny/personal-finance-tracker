<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ isEdit ? 'Edit Transaction' : 'Add Transaction' }}</h3>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Type</label>
            <div class="type-selector">
              <button 
                type="button" 
                :class="['type-btn', { active: formData.type === 'expense' }]"
                @click="formData.type = 'expense'"
              >
                <i class="bi bi-arrow-up"></i> Expense
              </button>
              <button 
                type="button" 
                :class="['type-btn', { active: formData.type === 'income' }]"
                @click="formData.type = 'income'"
              >
                <i class="bi bi-arrow-down"></i> Income
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>Amount</label>
            <input 
              type="number" 
              v-model="formData.amount" 
              class="form-control" 
              placeholder="0.00"
              step="0.01"
              required
            >
          </div>

          <div class="form-group">
            <label>Category</label>
            <select v-model="formData.category" class="form-control" required>
              <option value="" disabled>Select category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Description</label>
            <input 
              type="text" 
              v-model="formData.description" 
              class="form-control" 
              placeholder="What was this for?"
            >
          </div>

          <div class="form-group">
            <label>Date</label>
            <input 
              type="date" 
              v-model="formData.transaction_date" 
              class="form-control" 
              required
            >
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Saving...' : (isEdit ? 'Update' : 'Save') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  transaction: {
    type: Object,
    default: null
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit'])

const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Housing', 'Medical', 'Salary', 'Other']

const formData = reactive({
  type: 'expense',
  amount: '',
  category: '',
  description: '',
  transaction_date: new Date().toISOString().slice(0, 10)
})

const isSubmitting = ref(false)

watch(() => props.transaction, (newVal) => {
  if (newVal && props.isEdit) {
    formData.type = newVal.type
    formData.amount = newVal.amount
    formData.category = newVal.category
    formData.description = newVal.description || ''
    formData.transaction_date = newVal.transaction_date?.slice(0, 10) || new Date().toISOString().slice(0, 10)
  }
}, { immediate: true })

const handleSubmit = async () => {
  if (!formData.amount || formData.amount <= 0) {
    alert('Please enter a valid amount')
    return
  }
  
  if (!formData.category) {
    alert('Please select a category')
    return
  }
  
  isSubmitting.value = true
  
  const submitData = {
    type: formData.type,
    amount: parseFloat(formData.amount),
    category: formData.category,
    description: formData.description,
    transaction_date: formData.transaction_date
  }
  
  await emit('submit', submitData)
  isSubmitting.value = false
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(92, 91, 90, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #F0EAE2;
}

.modal-header h3 {
  margin: 0;
  color: #5C5B5A;
  font-size: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #C0BAB2;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #5C5B5A;
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #5C5B5A;
  font-weight: 500;
  font-size: 14px;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #F0EAE2;
  border-radius: 12px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  background: white;
}

.form-control:focus {
  outline: none;
  border-color: #9CAF9A;
}

.type-selector {
  display: flex;
  gap: 12px;
}

.type-btn {
  flex: 1;
  padding: 12px;
  border: 2px solid #F0EAE2;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: #5C5B5A;
}

.type-btn.active {
  border-color: #9CAF9A;
  background: rgba(159, 175, 154, 0.1);
  color: #7C9A7A;
}

.type-btn i {
  font-size: 16px;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #7C9A7A 0%, #5B7A59 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  margin-top: 8px;
  font-size: 16px;
}

.submit-btn:hover {
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}
</style>