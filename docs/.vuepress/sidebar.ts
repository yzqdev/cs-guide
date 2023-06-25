import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/frontend/': 'structure',
  '/mc-tutor/': 'structure',
  '/java-tutor/': 'structure',
  '/go-tutor/': 'structure',
  '/linux-tutor/': 'structure',
  '/python-tutor/': 'structure',
  '/csharp-tutor/': 'structure',
  '/git-tutor/': 'structure',
  '/windows-tutor/': 'structure',
  '/android-tutor/': [
    {
      text: '指南',
      collapsible: true,
      prefix: '/android-tutor/basic/',

      children: ['README.md', 'application.md', 'helloworld.md', 'resources.md', 'activity.md', 'service.md', 'boardcast.md', 'content.md', 'fragment.md', 'single-frame.md', 'list-frag.md', 'frag-guodu.md', 'intent-filter.md'],
    },
    {
      text: '界面',
      collapsible: true,
      prefix: '/android-tutor/interface/',
      children: ['ui.md', 'controls.md', 'events.md', 'styles.md', 'custom-components.md'],
    },
    {
      text: '高级',
      collapsible: true,
      prefix: '/android-tutor/advanced/',
      children: ['drag-and-drop.md', 'notification.md', 'location.md', 'send-email.md', 'sms.md', 'phone-call.md', 'publish-app.md', 'alert-dialog.md', 'animation.md', 'ring-control.md', 'audio-capture.md', 'bluetooth.md', 'camera.md', 'clipboard.md', 'fonts.md', 'gestures.md', 'image-effects.md', 'internal-storage.md', 'json-parse.md', 'spinner.md', 'localization.md', 'login.md', 'media-player.md', 'multi-touch.md', 'navigation.md', 'network-connection.md', 'php-mysql.md', 'progress-circle.md', 'sensor.md', 'session.md', 'spell-check.md', 'sqlite.md', 'text-to-speech.md', 'xml.md'],
    },
  ],
  '/android-tips/': 'structure',
  '/flutter-tutor/': 'structure',
  '/kotlin-tutor/': 'structure',
  
  '/cs-tips/': 'structure',
  '/node-tutor/': 'structure',
})
