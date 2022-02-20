
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {

        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();
                // Unit.Value means nothing .... a way to tell the controller we are finshed 
                return Unit.Value;
            }
        }
    }
}