'use client';

import { motion } from 'framer-motion';
import { Award, Users, Clock, MapPin } from 'lucide-react';

const stats = [
  {
    icon: Clock,
    value: '25+',
    label: 'Years of Excellence',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    value: '5000+',
    label: 'Happy Clients',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Award,
    value: '15+',
    label: 'Industry Awards',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: MapPin,
    value: '50+',
    label: 'Cities Served',
    color: 'from-violet-500 to-purple-500',
  },
];

export function StatsBar() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS0yLTJ2Mmg0di0yaC00em0tNCAwaC0ydjJoMnYtMnptLTQgMGgtMnYyaDJ2LTJ6bS00IDBoLTJ2MmgydC0yem0tNC0ydjRoMnYtNGgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />

      <div className="container mx-auto px-3 sm:px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className={`inline-flex p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} mb-3 sm:mb-4`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                <div className="mb-1.5 sm:mb-2">
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                </div>

                <p className="text-xs sm:text-sm md:text-base font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                  {stat.label}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl sm:rounded-b-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
