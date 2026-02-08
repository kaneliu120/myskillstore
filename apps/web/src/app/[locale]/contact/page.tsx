'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Mail, Phone, Send } from 'lucide-react';

export default function ContactPage() {
  const locale = useLocale();
  const isZh = locale === 'zh';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-purple-900 to-indigo-900 text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            {isZh ? '联系我们' : 'Contact Us'}
          </h1>
          <p className="text-lg md:text-xl text-purple-100/80 max-w-2xl mx-auto">
            {isZh 
              ? '无论是产品咨询、技术支持还是商务合作，我们都在这里随时为您解答。'
              : 'Whether you have a question about features, trials, pricing, need a demo, or anything else, our team is ready to answer all your questions.'}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                {isZh ? '取得联系' : 'Get in Touch'}
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{isZh ? '邮箱' : 'Email'}</h3>
                    <p className="text-gray-600">support@myskillshop.com</p>
                    <p className="text-gray-600">partners@myskillshop.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{isZh ? '电话' : 'Phone'}</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">{isZh ? '周一至周五 9am - 6pm' : 'Mon-Fri 9am - 6pm'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{isZh ? '地址' : 'Address'}</h3>
                    <p className="text-gray-600">
                      123 Innovation Drive, Suite 100<br />
                      Tech Valley, CA 94043<br />
                      USA
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-12 w-full h-64 bg-gray-100 rounded-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                  <MapPin className="w-8 h-8 mr-2" /> Map Placeholder
                </div>
                {/* Normally you'd embed Google Maps iframe here */}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">
                {isZh ? '发送消息' : 'Send us a Message'}
              </h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-700 mb-2">
                    {isZh ? '发送成功！' : 'Message Sent!'}
                  </h3>
                  <p className="text-gray-600">
                    {isZh ? '我们会尽快与您联系。' : 'We will get back to you as soon as possible.'}
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    {isZh ? '发送另一条消息' : 'Send Another Message'}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{isZh ? '姓名' : 'Name'}</Label>
                      <Input 
                        id="name" 
                        placeholder={isZh ? '您的姓名' : 'Your name'} 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{isZh ? '邮箱' : 'Email'}</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder={isZh ? '您的邮箱' : 'your@email.com'}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">{isZh ? '主题' : 'Subject'}</Label>
                    <Input 
                      id="subject" 
                      placeholder={isZh ? '这是关于...' : 'What is this about?'} 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{isZh ? '消息' : 'Message'}</Label>
                    <Textarea 
                      id="message" 
                      placeholder={isZh ? '请描述您的需求...' : 'Tell us how we can help...'} 
                      className="min-h-[150px]"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 text-lg font-medium"
                    disabled={loading}
                  >
                    {loading ? (isZh ? '发送中...' : 'Sending...') : (isZh ? '发送消息' : 'Send Message')}
                  </Button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
