using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace NetCoreAPI
{
    public static class ExtensionMethods
    {
        public static IOrderedQueryable<TSource> OrderByWithDirection<TSource, TKey>
            (this IQueryable<TSource> source,
            Expression<Func<TSource, TKey>> keySelector,
            bool descending)
        {
            return descending ? source.OrderByDescending(keySelector)
                : source.OrderBy(keySelector);
        }

        public static object GetPropertyDynamic<Tobj>(this Tobj self, string propertyName) where Tobj : class
        {
            var param = Expression.Parameter(typeof(Tobj), "value");
            var getter = Expression.Property(param, propertyName);
            var boxer = Expression.TypeAs(getter, typeof(object));
            var getPropValue = Expression.Lambda<Func<Tobj, object>>(boxer, param).Compile();
            return getPropValue(self);
        }
    }
}