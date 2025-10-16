export function getFileIcon(mimeType: string): string {
  switch (mimeType) {
    case 'application/pdf':
      return '📄' // Or use an actual PDF icon
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return '📝'
    // Add more file types as needed
    default:
      return '📎'
  }
}