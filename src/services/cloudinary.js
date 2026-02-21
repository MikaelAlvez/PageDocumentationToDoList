const CLOUD_NAME = 'dgatcey4u'
const UPLOAD_PRESET = 'bs0ip1ol'

export async function uploadAvatar(file) {
  if (file.size > 2 * 1024 * 1024) {
    throw new Error('Imagem muito grande. Máximo 2MB.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('folder', 'todo-app/avatars')

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error('Falha ao fazer upload da imagem.')
  }

  const data = await res.json()
  return data.secure_url
}