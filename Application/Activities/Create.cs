
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {

        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidater : AbstractValidator<Command>
        {
            public CommandValidater()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                var result = await _context.SaveChangesAsync();

                if (result == 0) return Result<Unit>.Failure("failed to create activity");
                return Result<Unit>.Success(Unit.Value);

                // Unit.Value means nothing .... a way to tell the controller we are finshed 
                // return Unit.Value;
            }
        }
    }
}