using MyWallet.Data;
using MyWallet.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Services.Implementation
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly MyWalletContext _context;
        protected readonly DbSet<TEntity> Entities;

        public Repository(MyWalletContext context)
        {
            _context = context;
            Entities = _context.Set<TEntity>();
        }

        public void Add(TEntity entity)
        {
            Entities.Add(entity);
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
            Entities.AddRange(entities);    
        }

        public IQueryable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.Where(predicate);
        }

        public async Task<TEntity> Get(int Id)
        {
            return await Entities.FindAsync(Id);
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await Entities.ToListAsync();
        }

        public void Remove(TEntity entity)
        {
            Entities.Remove(entity);
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            Entities.RemoveRange(entities);
        }

        public async Task<TEntity> SingleOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return await Entities.SingleOrDefaultAsync(predicate);
        }


        public void Update(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}
