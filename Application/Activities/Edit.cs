
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
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
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                this._mapper = mapper;
                this._context = context;
            }


            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                if (activity == null) return null;
                // instead of using below code for each properaties  we use mapper 
                // activity.Title=request.Activity.Title ?? activity.Title
                _mapper.Map(request.Activity, activity);
                var result = await _context.SaveChangesAsync();
                if (result == 0) return Result<Unit>.Failure("Failed to edit activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }



    }
}