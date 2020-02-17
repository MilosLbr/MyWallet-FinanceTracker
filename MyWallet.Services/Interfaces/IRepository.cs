using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Services.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        // read
        Task<TEntity> Get(int Id);
        Task<IEnumerable<TEntity>> GetAll();
        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> SingleOrDefault(Expression<Func<TEntity, bool>> predicate);

        // add
        void Add(TEntity entity);
        void AddRange(IEnumerable<TEntity> entities);

        // update
        void Update(TEntity entity);

        // remove
        void Remove(TEntity entity);
        void RemoveRange(IEnumerable<TEntity> entities);

    }
}
